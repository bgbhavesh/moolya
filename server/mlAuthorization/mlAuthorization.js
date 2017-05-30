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
            console.log(d.kind)
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


          if(isWhiteList)
              return true


          if((typeName == 'ContextSpecSearch' || typeName == 'SearchQuery') && moduleName == 'GENERIC' && actionName == 'READ'){
              var startToken = schemaDef.loc.startToken
              do{
                  if(startToken.value == 'module'){
                      moduleName = startToken.next.next.value.toUpperCase();
                      if(moduleName == 'REGISTRATIONINFO' || moduleName == 'REGISTRATIONAPPROVEDINFO'){
                          moduleName = 'REGISTRATION';
                      }
                      isContextSpecSearch = true;
                      break;
                  }
                  startToken = startToken.next
              }while(startToken)
          }

          if(!moduleName){
            return false;
          }

          isValidAuth = this.validteAuthorization(context.userId, moduleName, actionName, req.body, isContextSpecSearch);
          return isValidAuth
    }

    validteAuthorization(userId, moduleName, actionName, req, isContextSpecSearch)
    {
        check(userId, String)
        check(moduleName, String)
        check(actionName, String)
        check(req, Object)

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
            let hierarchy = MlHierarchy.findOne({level:Number(userProfileDetails.hierarchyLevel)});

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
                let role;
                // _.each(user_roles, function (role)
                for(var i = 0; i < user_roles.length; i++){
                    ret = this.validateRole(user_roles[i].roleId, module, action)
                    if(ret){
                      return this.validateDataContext(user_roles[i], moduleName, actionName, req, isContextSpecSearch)
                    }
                }
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
                if(module.moduleId == "all" || module.moduleId == accessModule._id){
                    let actions = module.actions;
                    actions.map(function (action) {
                        if(action.actionId == "all" || action.actionId == accessAction._id || action.actionId == accessAction.code){
                            ret = true;
                            return;
                        }
                    })
                }
            })
        }
        return ret;
    }

    validateDataContext(roleDetails, moduleName, actionName, req, isContextSpecSearch)
    {
        switch (moduleName){

            case 'CLUSTER':{
                if(isContextSpecSearch && req.variables.context == null ){
                    return true;
                }
                if(roleDetails['clusterId'] && roleDetails['clusterId'] == req.variables['clusterId'] || (req.variables.context && roleDetails['clusterId'] == req.variables.context['clusterId'])){
                    return true
                }
            }
            break;
            case 'CHAPTER':
            {
                if(isContextSpecSearch && req.variables.context['clusterId'] == roleDetails['clusterId']){
                  return true;
                }
            }
            break;

            case 'SUBCHAPTER':
            {
                if(isContextSpecSearch && ((req.variables.context && roleDetails['chapterId'] == req.variables.context['chapterId'] && roleDetails['clusterId'] == req.variables.context['clusterId']) || (roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['clusterId'] == req.variables['clusterId']))){
                    return true
                }

                if(req.variables.context && roleDetails['clusterId'] == req.variables.context['clusterId']){
                    if(roleDetails['subChapterId'] == 'all')
                      return true;
                }
                if(req.variables.id){
                    var subChapter = mlDBController.findOne('MlSubChapters', {"_id":req.variables.id}, context)
                    if(subChapter && roleDetails['clusterId'] == subChapter.clusterId && roleDetails['chapterId'] == subChapter.chapterId){
                           return true;
                    }
                }
            }
            break;

            case 'COMMUNITY':
            {
               return true
            }
            break;

            case 'DEPARTMENT':
            case 'SUBDEPARTMENT':
            {
                for(key in roleDetails){
                    if(roleDetails[key] == req.variables.docId){
                        return true
                    }
                }
            }
            break;
            case 'USERS':{
                  if(actionName == 'READ'){
                      if(roleDetails['clusterId'] == req.variables['clusterId']){
                          // cluster admin context
                          if(roleDetails['chapterId'] == 'all' && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all'){
                              return true;
                          }
                          // chapter admin context
                          else if(roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['subChapterId'] == "all" && roleDetails['communityId'] == 'all'){
                             return true
                          }

                          // sub chapter admin context
                          else if(roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['subChapterId'] == req.variables['subChapterId'] && roleDetails['communityId'] == 'all'){
                            return true
                          }

                          // community admin context
                          else if(roleDetails['chapterId'] == req.variables['chapterId'] && roleDetails['subChapterId'] == req.variables['subChapterId'] && roleDetails['communityId'] == 'all'){
                            return true
                          }

                      }
                  }

            }
            break;
            case 'TAXATION':
            case 'GLOBALSETTINGS':
            case 'MASTERSETTINGS':{
                if(actionName == 'CREATE'){
                  return true;
                }
                else if(actionName == 'UPDATE'){
                }
                else if(actionName == 'READ'){
                    return true;
                }
            }
            break;
          case 'FILTERS':
          case 'REGISTRATION':
          case 'REQUESTTYPE':{
              return true;
          }
        }

        return false
    }

  // hasAccessBasedOnContext(context,moduleName,actionName,req){
  //   let hasAccessBasedOnContext=true;
  //   switch(moduleName){
  //     case "MASTER_SETTINGS":
  //       hasAccessBasedOnContext=new MlAdminMasterSettingsAuthorization(context).authorize(actionName,context,req);
  //   }
  //   return hasAccessBasedOnContext;
  // }

}

module.exports = MlAuthorization
