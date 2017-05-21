/**
 * Created by mohammed.mohasin on 2/02/17.
 */

import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext';
var _ = require('lodash');

class MlAdminContextQueryConstructor
{
  constructor(userId,request){
        this.userId=userId;
        this.module=request&&request.module?request.module:"";
        this.contextData.bind(this);
  }

  /*
   * This method returns the context data constraint object of the user based on his hierarchy.
   * @param userProfile,hierarchyDetails,query
   * returns result Object containing context values({clusterId,chapterId,subChapterId,communityId})
   */
  contextData(userProfile,hierarchyDetails,contextObject){
   var hierarchyModuleFieldRefMap={'clusterId':'defaultProfileHierarchyRefId','chapterId':'defaultChapters','subChapterId':'defaultSubChapters',
    'communityId':'defaultCommunities'};
    // module field names defined in Heirarchy definition clusterId,chapterId,subChapterId,communityId
    var moduleFieldRefId=hierarchyDetails.moduleFieldRef;
    var contextFieldRefId=hierarchyModuleFieldRefMap[moduleFieldRefId]||moduleFieldRefId;
    var contextFieldValue=userProfile[contextFieldRefId];
    //check if value is specific or 'all'
    if(_.isArray(contextFieldValue)&&!_.isEmpty(contextFieldValue)&&_.indexOf(contextFieldValue, "all") < 0){
      contextObject[moduleFieldRefId]=contextFieldValue;
    }else if(_.isString(contextFieldValue)){
      contextObject[moduleFieldRefId]=[contextFieldValue];
   }
 }

  /*
   * This method replaces the context data field keys with module specific context field keys
   * @param contextFieldsMap(eg: registration module has key 'registrationInfo.clusterId' for clusterId)
   * returns result Object containing new context keys  specific to module
   */
  static updateQueryFieldNames(fieldsObj,fieldsMap){
     var fieldNamesMap=fieldsMap||{};
     var fieldsValObj=fieldsObj||{};
    _.forIn(fieldsValObj,function(value, key) {
             let newKey = fieldNamesMap[key];
             if(newKey){
               fieldsValObj[newKey] = value;
                delete fieldsValObj[key];
             }
    });
    return fieldsValObj;
  }


  /*
   * This method replaces the context data field keys with module specific context field keys
   * @param operator(eg: its $in,$nin,$or,$and operator input for constructing the query)
   * @param queryObj(eg: object containing the fields)
   * returns result Object with the query operators
   */
  static constructQuery(queryObj,operator){
    var operator=operator||'';
    var queryObj=queryObj||{};
    switch(operator){
      case '$in':
         _.forIn(queryObj,function(value, key) {
              if(value && _.isArray(value)){
                 queryObj[key] = {'$in':value};
                }
          });
        break;
      case '$or':
           var orQueryObj=[];
            _.forIn(queryObj,function(value, key) {
                let obj={};
                obj[key]=value;
                orQueryObj.push(obj);
        });
        //MongoError: $and/$or/$nor must be a nonempty array
               if(!_.isEmpty(orQueryObj))queryObj={'$or':orQueryObj};
        break;
      case '$and':
          var andQueryObj=[];
            _.forIn(queryObj,function(value, key) {
              let obj={};
              obj[key]=value;
              if(value&&!_.isEmpty(value)){
                  andQueryObj.push(obj);
              }
        });
        //MongoError: $and/$or/$nor must be a nonempty array
        if(!_.isEmpty(andQueryObj))queryObj={'$and':andQueryObj};
        break;

    }

    return queryObj;
  }

  contextQuery()
  {
      var query={};
      var hierarchy=null;
      var userProfile=new MlAdminUserContext().userProfileDetails(this.userId);

      if(!userProfile || (!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
          throw new Error("Invalid User,Default Profile is not available");
      }

      hierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});

      if(!hierarchy){
        throw new Error("Invalid Request,Hierarchy Level could not be resolved");
      }
      //Platform Admin Hierarchy
      if(hierarchy.isParent===true){
        return query;
      }
      //Cluster/Chapter/Sub Chapter  Admin
      if(userProfile&&userProfile.hierarchyCode===hierarchy.code)  {
        //Fix: remove the module and make it generic
          if(this.module == 'cluster')
          {
              if(_.toLower(this.module)===_.toLower(hierarchy.module)){
                  query["_id"]=userProfile.defaultProfileHierarchyRefId;
              }else{
                query[hierarchy.moduleFieldRef]=userProfile.defaultProfileHierarchyRefId;
              }
          }

          else if(this.module == 'chapter'){
              query["_id"]=userProfile.defaultChapters;
          }

          else if(this.module == 'subChapter'){
              query["_id" ]=userProfile.defaultSubChapters;
          }

          else{
          //Read the Hierarchy structure and build the context based on user hierarchy.
          var parents=hierarchy.parent;
            query={};
          this.contextData(userProfile,hierarchy,query);
          var that=this;
           _.each(parents,function(p){
               if(!p.isParent){
                 that.contextData(userProfile,p,query);
               }
           });

          }

          return query;
      }

  }

}

module.exports = MlAdminContextQueryConstructor
