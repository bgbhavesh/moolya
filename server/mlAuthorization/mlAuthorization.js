/**
 * Created by venkatasrinag on 30/1/17.
 */

import MlAdminUserContext from './mlAdminUserContext'
import { parse, buildASTSchema } from 'graphql';
import MlResolver from '../commons/mlResolverDef';

var _ = require('lodash');

class MlAuthorization
{
    constructor(){
    }

    authChecker({req, context, res}){
          let query = parse(req.body.query);
          let schemaDef;
          let moduleName;
          let actionName;
          let operation;
          let typeName = '';
          let isValidAuth = false;
          let isWhiteList = false;
          let isContextSpecSearch = false
          for(var i = 0; i < query.definitions.length; i++){
            const d = query.definitions[i];
            switch (d.kind){
              case 'OperationDefinition':
                if (schemaDef) {
                  throw new Error('Must provide only one schema definition.');
                }
                schemaDef = d;
                break;
            }
          }
          operation = schemaDef.operation;
          schemaDef.selectionSet.selections.forEach(operationType => {
            typeName = operationType.name.value
          })
          let modules = MlResolver.MlModuleResolver;
          var ret = this.valiateApi(MlResolver.MlModuleResolver, typeName);
          isWhiteList = ret.isWhiteList;
          moduleName = ret.moduleName;
          actionName = ret.actionName;
          if(isWhiteList)
              return true
          if((typeName == 'ContextSpecSearch' || typeName == 'SearchQuery') && moduleName == 'GENERIC' && actionName == 'READ'){
              var startToken = schemaDef.loc.startToken
              do{
                  if(startToken.value == 'module'){
                      moduleName = startToken.next.next.value.toUpperCase();
                      /*
                      Handling all three modules of interanal requests
                      */

                      if(moduleName == 'INTERNALREQUESTS' || moduleName == 'INTERNALAPPROVEDREQUESTS' || moduleName=='INTERNALREJECTEDREQUESTS'){
                        moduleName = 'INTERNALREQUESTS';
                      }

                      if(moduleName == 'REGISTRATIONINFO' || moduleName == 'REGISTRATIONAPPROVEDINFO' || moduleName=='REGISTRATIONREJECTEDINFO'){
                          moduleName = 'REGISTRATION';
                      }

                      if(moduleName == 'PORTFOLIOREQUESTS' || moduleName == 'PORTFOLIOAPPROVED'){
                          moduleName = 'PORTFOLIO';
                      }
                      if(moduleName == 'OFFICETRANSACTION'){
                        moduleName = 'OFFICE';
                      }



                      if(moduleName == 'AUDIT_LOG')
                          return true
                      isContextSpecSearch = true;
                      break;
                  }
                  startToken = startToken.next
              }while(startToken)
          }

          if(!moduleName){
            return false;
          }

          let variables = _.cloneDeep(req.body.variables)
          isValidAuth = this.validteAuthorization(context.userId, moduleName, actionName, variables, isContextSpecSearch);
          return isValidAuth
    }

  valiateApi(modules, typeName){
    var moduleName, actionName, isWhiteList;
    _.each(modules, function (module)
    {
      let validApi = _.find(module, {api:typeName})
      if(validApi && validApi.isWhiteList){
        isWhiteList = true
        return;
      }
      if(validApi){
        moduleName = validApi.moduleName;
        actionName = validApi.actionName;
        return;
      }
    })

    return {isWhiteList:isWhiteList, moduleName:moduleName, actionName:actionName}
  }


    validteAuthorization(userId, moduleName, actionName, variables, isContextSpecSearch)
    {
        check(userId, String)
        check(moduleName, String)
        check(actionName, String)
        // check(variables, Object)

        let ret = false;

        let self = this;
        let action = mlDBController.findOne('MlActions', {code:actionName})
        if(!action){
            return false;
        }
        let module = mlDBController.findOne('MlModules', {code:moduleName})
        if(!module){
            return false;
        }

    var user = mlDBController.findOne('users', {_id: userId}, context)
    if(user && user.profile && user.profile.isInternaluser == true)
    {
      let userProfileDetails = new MlAdminUserContext().userProfileDetails(userId);
      var hierarchy = MlHierarchy.findOne({level:Number(userProfileDetails.hierarchyLevel)});

            if(hierarchy.isParent===true){
              return true;
            }
            let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
            let user_roles;



            // Selecting Default Profile
            for(var i = 0; i < user_profiles.length; i++){
                if(user_profiles[i].isDefault == true){
                    user_roles = user_profiles[i].userRoles
                    break;
                }
            }

            if(user_roles && user_roles.length > 0){

                var highestRole = _.find(user_roles , {hierarchyCode:userProfileDetails.hierarchyCode})
                ret = this.validateRole(highestRole.roleId, module, action)
                if(ret){
                  return this.validateDataContext(highestRole, moduleName, actionName, variables, isContextSpecSearch, hierarchy)
                }
                return ret;
            }
        }
        else if(user && user.profile && user.profile.isExternaluser == true){
            return true
        }
        return ret;
    }

    validateRole(roleId, accessModule, accessAction){
      let ret = false;
      let role = mlDBController.findOne('MlRoles', {_id: roleId})
      if(role)
      {
        role.modules.map(function (module) {
          if(module && !module.isActive)
            return;
          if(module.moduleId == "all" || module.moduleId == accessModule._id){
            let actions = module.actions;
            actions.map(function (action) {
              if(action.actionId == "all" || action.actionId == accessAction._id || action.actionId == accessAction.code){
                ret = true
                return;
              }
            })
          }
        })
      }
      return ret;
    }

      validateDataContext(roleDetails, moduleName, actionName, variables, isContextSpecSearch){
        if(isContextSpecSearch || moduleName == 'GLOBALSETTINGS' || moduleName == 'MASTERSETTINGS')
          return true;

        var ctxDetails = this.getContextDetails(moduleName, actionName, variables);
        if(!_.isEmpty(ctxDetails))
          variables = ctxDetails;

        if(!this.validateCluster(roleDetails, variables))
          return false

        switch (moduleName){
          case 'TAXATION':
          case 'CLUSTER':
            return true;
          case 'CHAPTER':
          case 'SUBCHAPTER':
          case 'COMMUNITY':
          case 'USERS':
          case 'REGISTRATION':
          case 'PORTFOLIO':
          case 'TEMPLATEASSIGNMENT':
          case "INTERNALREQUESTS":
          case "OFFICE":
          case "PROCESSSETUP":{              /*adding office and process setup for others five admin */
            return this.validateChapterSubChapter(roleDetails, variables);
          }
          break;
        }
      }

        getContextDetails(moduleName, actionName, variables){
        switch(moduleName){
          case 'USERS':{
              let community = this.getCommunityId(variables.clusterId, variables.chapterId, variables.subChapterId, variables.communityId)
              if(community)
                variables.communityId= community._id
          }
          break;
          case 'REGISTRATION':{
            if(actionName == 'CREATE'){
                let community = this.getCommunityId(variables.registration.clusterId, variables.registration.chapterId, variables.registration.subChapterId, variables.registration.registrationType)
                if(community)
                  variables.registration.communityId = community._id

                return variables.registration;
            }

            return this.getRegistrationContextDetails(variables.registrationId)
          }
          break;
          case 'PORTFOLIO':{
            return MlPortfolioDetails.findOne(variables.portfoliodetailsId)
          }
          break;
          case 'TEMPLATEASSIGNMENT':{
            var template = MlTemplateAssignment.findOne(variables.id);
            if(!template)
              return;

            return {clusterId:template.templateclusterId, chapterId:template.templatechapterId, subChapterId:template.templatesubChapterId, communityId:template.templateCommunityId}
          }
          break;
          case 'INTERNALREQUESTS':
          {
            let community = this.getCommunityId(variables.clusterId, variables.chapterId, variables.subChapterId, variables.communityId)
            if(community){
              variables.communityId= community._id
            }
            return this.getInternalRequestContextDetails(variables, actionName)
          }
          break;
        }
        return variables;
      }

      validateCluster(roleDetails, variables){
        if(!variables)
          return false
        if(roleDetails.clusterId == variables['clusterId'])
          return true;
        return false;
      }

      validateChapterSubChapter(roleDetails, variables){
        if(!variables)
          return false

        var isEqual = _.isMatch(roleDetails, {"chapterId":"all", 'subChapterId':'all', "communityId":"all"})
        if(isEqual)
          return true

        isEqual = _.isMatch(roleDetails, {"chapterId":variables['chapterId'], 'subChapterId':'all', "communityId":"all"})
        if(isEqual)
          return true

        isEqual = _.isMatch(roleDetails, {"chapterId":variables['chapterId'], 'subChapterId':variables['subChapterId'], "communityId":"all"})
        if(isEqual)
          return true

        isEqual = _.isMatch(roleDetails, {"chapterId":variables['chapterId'], 'subChapterId':variables['subChapterId'], "communityId":variables['communityId']})
        if(isEqual)
          return true
        return false
      }

      getRegistrationContextDetails(registrationId){
        var registration = MlRegistration.findOne(registrationId)
        if(!registration)
          return

        let community = this.getCommunityId(registration.registrationInfo.clusterId, registration.registrationInfo.chapterId, registration.registrationInfo.subChapterId, registration.registrationInfo.registrationType)
        registration.registrationInfo.communityId = community._id
        return registration.registrationInfo
      }

      getInternalRequestContextDetails(variables, actionName){
        if(actionName == 'CREATE'){
            return {clusterId:variables['clusterId'], chapterId:variables['chapterId'], subChapterId:variables['subChapterId'], communityId:variables['communityId']};
        }
        if(actionName == 'UPDATE'){
          let request = this.getRequest(variables.requestsId)
          if(request){
            variables.clusterId = request.cluster
            variables.chapterId = request.chapter
            variables.subChapterId = request.subChapter
            variables.communityId = request.communityId
          }
          return variables;
        }
      }

      getCommunityId(clusterId, chapterId, subChapterId, defCode){
        return MlCommunity.findOne({communityDefCode:defCode, clusterId:clusterId, chapterId:chapterId, subChapterId:subChapterId})
      }

      getRequest(requestId){
        return MlRequests.findOne({requestId:requestId})
      }

    // validateDataContext(roleDetails, moduleName, actionName, req, isContextSpecSearch)
    // {
    //     switch (moduleName)
    //     {
    //       case 'CLUSTER':{
    //         if(isContextSpecSearch && req.variables.context == null ){
    //           return true;
    //         }
    //         if(roleDetails['clusterId'] && roleDetails['clusterId'] == req.variables['clusterId'] || (req.variables.context && roleDetails['clusterId'] == req.variables.context['clusterId'])){
    //           return true
    //         }
    //       }
    //       break;
    //       case 'CHAPTER':
    //       {
    //         if(isContextSpecSearch && req.variables.context){
    //           if(roleDetails['clusterId'] == req.variables.context['clusterId']){
    //             if(roleDetails['chapterId'] == 'all' || actionName == 'READ')
    //               return true;
    //             if(req.variables.context['chapterId'] == roleDetails['chapterId']){
    //               return true;
    //             }
    //           }
    //         }
    //         if(req.variables['clusterId'] == roleDetails['clusterId']){
    //           if(roleDetails['chapterId'] == 'all'){
    //             return true;
    //           }
    //           if(req.variables['chapterId'] == roleDetails['chapterId']){
    //             return true;
    //           }
    //         }
    //       }
    //       break;
    //       case 'SUBCHAPTER': {
    //         if (isContextSpecSearch && req.variables.context) {
    //           if (roleDetails['clusterId'] == req.variables.context['clusterId']) {
    //             if (roleDetails['chapterId'] == 'all')
    //               return true;
    //             if (req.variables.context['chapterId'] == roleDetails['chapterId']) {
    //               return true;
    //             }
    //           }
    //         }
    //
    //           if (actionName == "CREATE") {
    //             // if ((roleDetails['clusterId'] == req.variables.subChapter['clusterId'] && roleDetails['chapterId'] == req.variables.subChapter['chapterId']) && hierarchy.level >= 2) {
    //             //   return true
    //             // }
    //
    //             if(roleDetails['clusterId'] == req.variables.subChapter['clusterId']){
    //
    //               // cluster admin context
    //               if (roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == 'all' && roleDetails['communityId'] == 'all') {
    //                 return true
    //               }
    //
    //               // chapter admin context
    //               else if (roleDetails['chapterId'] == req.variables.subChapter['chapterId'] && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all') {
    //                 return true
    //               }
    //
    //             }
    //           }
    //
    //           if (actionName == "UPDATE") {
    //             if(req.subChapterId){
    //               var subChapter = mlDBController.findOne('MlSubChapters', {"_id": req.subChapterId}, context);
    //
    //               if(roleDetails['clusterId'] == subChapter['clusterId']){
    //
    //                 // cluster admin context
    //                 if (roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == 'all' && roleDetails['communityId'] == 'all') {
    //                   return true
    //                 }
    //
    //                 // chapter admin context
    //                 else if (roleDetails['chapterId'] == subChapter.chapterId && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all') {
    //                   return true
    //                 }
    //               }
    //             }
    //           }
    //
    //           if ((req.variables && roleDetails['clusterId'] == req.variables['clusterId'] && roleDetails['chapterId'] == req.variables['chapterId'])) {
    //             return true
    //           }
    //
    //           if (req.variables && (req.variables.subChapterId || req.variables.id)) {
    //             var subChapterId = req.variables.subChapterId || req.variables.id;
    //             var subChapter = mlDBController.findOne('MlSubChapters', {"_id": subChapterId}, context)
    //             if (subChapter && roleDetails['clusterId'] == subChapter.clusterId) {
    //               // cluster admin context
    //               if (roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == 'all' && roleDetails['communityId'] == 'all') {
    //                 return true
    //               }
    //
    //               // chapter admin context
    //               else if (roleDetails['chapterId'] == subChapter.chapterId && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all') {
    //                 return true
    //               }
    //
    //               // sub chapter admin context
    //               else if (roleDetails['chapterId'] == subChapter.chapterId && roleDetails['subChapterId'] == subChapter.subChapterId && roleDetails['communityId'] == 'all') {
    //                 return true
    //               }
    //
    //               // community admin context
    //               else if (roleDetails['chapterId'] == subChapter.chapterId && roleDetails['subChapterId'] == subChapter.subChapterId && roleDetails['communityId'] == subChapter.communityId) {
    //                 return true
    //               }
    //
    //             }
    //             if (subChapter && roleDetails['clusterId'] == subChapter.clusterId && roleDetails['chapterId'] == subChapter.chapterId) {
    //               return true;
    //             }
    //           }
    //         }
    //         break;
    //
    //         case 'COMMUNITY':
    //         {
    //            return true
    //         }
    //         break;
    //
    //         case 'DEPARTMENT':
    //         case 'SUBDEPARTMENT':
    //         {
    //             for(key in roleDetails){
    //                 if(roleDetails[key] == req.variables.docId){
    //                     return true
    //                 }
    //             }
    //         }
    //         break;
    //         case 'USERS':{
    //               if(actionName == 'READ'){
    //                   if(roleDetails['clusterId'] == req.variables['clusterId'])
    //                   {
    //                       // cluster admin context
    //                       if(roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all'){
    //                           return true;
    //                       }
    //                       // chapter admin context
    //                       else if(roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all'){
    //                          return true
    //                       }
    //
    //                       // sub chapter admin context
    //                       else if(roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['subChapterId'] == req.variables['subChapterId'] && roleDetails['communityId'] == 'all'){
    //                         return true
    //                       }
    //
    //                       // community admin context
    //                       else if(roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['subChapterId'] == req.variables['subChapterId'] && roleDetails['communityId'] == 'all'){
    //                         return true
    //                       }
    //
    //                   }
    //                   // For Dashboard Community Priming
    //                   if(req.variables['clusterId'] == null || req.variables['userType']){
    //                       return true
    //                   }
    //                   if(req.variables['subChapterId']){
    //                     var subChapter = mlDBController.findOne('MlSubChapters', {"_id":req.variables.subChapterId}, context)
    //                     if(subChapter && roleDetails['clusterId'] == subChapter.clusterId) {
    //                       return true
    //                     }
    //                   }
    //               }
    //               // else if(actionName == 'UPDATE' && hierarchy.level==1){
    //               else if(actionName == 'UPDATE'){
    //                 return true;
    //               }
    //               // else if(actionName == 'CREATE' && hierarchy.level==1){
    //               else if(actionName == 'CREATE'){
    //                 return true;
    //               }
    //
    //         }
    //         break;
    //         case 'GLOBALSETTINGS':{
    //           // if(actionName == 'CREATE' && hierarchy.level>=3){
    //           if(actionName == 'CREATE'){
    //             return true;
    //           }
    //           // else if(actionName == 'UPDATE' && hierarchy.level>=3){
    //           else if(actionName == 'UPDATE'){
    //             return true;
    //           }
    //           else if(actionName == 'READ'){
    //             return true;
    //           }
    //         }
    //         break;
    //         case 'MASTERSETTINGS':{
    //             // if(actionName == 'CREATE' && hierarchy.level>=3){
    //             if(actionName == 'CREATE'){
    //               return true;
    //             }
    //             // else if(actionName == 'UPDATE' && hierarchy.level>=3){
    //             else if(actionName == 'UPDATE'){
    //               return true
    //             }
    //             else if(actionName == 'READ'){
    //                 return true;
    //             }
    //         }
    //         break;
    //       case 'REGISTRATION':{
    //           if(actionName == 'CREATE' || isContextSpecSearch)
    //             return true;
    //
    //           if(req.variables.registrationId){
    //                 var registration = MlRegistration.findOne(req.variables.registrationId)
    //                 if(!registration){
    //                     return false;
    //                 }
    //
    //                 if(roleDetails['clusterId'] == registration.registrationInfo.clusterId){
    //                     // cluster admin context
    //                     if(roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == 'all' && roleDetails['communityId'] == 'all'){
    //                         return true
    //                     }
    //
    //                     // chapter admin context
    //                     else if(roleDetails['chapterId'] == registration.registrationInfo.chapterId && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all'){
    //                       return true
    //                     }
    //
    //                     // sub chapter admin context
    //                     else if(roleDetails['chapterId'] == registration.registrationInfo.chapterId && roleDetails['subChapterId'] == registration.registrationInfo.subChapterId && roleDetails['communityId'] == 'all'){
    //                       return true
    //                     }
    //
    //                     // community admin context
    //                     else if(roleDetails['chapterId'] == registration.registrationInfo.chapterId && roleDetails['subChapterId'] == registration.registrationInfo.subChapterId && roleDetails['communityId'] == registration.registrationInfo.communityId){
    //                       return true
    //                     }
    //                 }
    //           }
    //
    //           if(actionName == 'READ')
    //             return true;
    //       }
    //       break;
    //       case 'ROLES':{
    //         if(actionName == 'READ'){
    //           return true;
    //         }
    //       }
    //       break;
    //       case 'TEMPLATES':{
    //         if(actionName == 'READ'){
    //           return true;
    //         }
    //       }
    //       break;
    //       case 'INTERNALREQUESTS':{
    //         return true
    //       }
    //       break;
    //       case 'INTERNALAPPROVEDREQUESTS':{
    //         return true
    //       }
    //       break;
    //       case 'DOCUMENTS':{
    //         if(actionName == 'READ' || isContextSpecSearch){
    //           return true;
    //         }
    //       }
    //       break;
    //       case 'TEMPLATEASSIGNMENT':{
    //         if(actionName == 'READ' || isContextSpecSearch){
    //           return true;
    //         }
    //       }
    //       break;
    //       case 'FILTERS':
    //       case 'REQUESTTYPE':{
    //           return true;
    //       }
    //       break;
    //       case 'HIERARCHY':{
    //         return true;
    //       }
    //         break;
    //       case 'TAXATION':{
    //         if(hierarchy.level>=3){
    //           return true
    //         }else if(actionName == 'READ' || isContextSpecSearch){
    //           return true;
    //         }
    //       }
    //       break;
    //       case 'PORTFOLIO':{
    //         if(actionName == 'CREATE' || isContextSpecSearch)
    //           return true;
    //
    //         if(req.variables.portfoliodetailsId){
    //           var portfolio = MlPortfolioDetails.findOne(req.variables.portfoliodetailsId)
    //           if(!portfolio){
    //             return false;
    //           }
    //           if(roleDetails['clusterId'] == portfolio.clusterId){
    //             // cluster admin context
    //             if(roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == 'all' && roleDetails['communityId'] == 'all'){
    //               return true
    //             }
    //
    //             // chapter admin context
    //             else if(roleDetails['chapterId'] == portfolio.chapterId && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all'){
    //               return true
    //             }
    //
    //             // sub chapter admin context
    //             else if(roleDetails['chapterId'] == portfolio.chapterId && roleDetails['subChapterId'] == portfolio.subChapterId && roleDetails['communityId'] == 'all'){
    //               return true
    //             }
    //
    //             // community admin context
    //             else if(roleDetails['chapterId'] == portfolio.chapterId && roleDetails['subChapterId'] == portfolio.subChapterId && roleDetails['communityId'] == portfolio.communityId){
    //               return true
    //             }
    //           }
    //
    //
    //
    //         }
    //       }
    //       break;
    //     }
    //
    //     return false
    // }

}

module.exports = MlAuthorization
