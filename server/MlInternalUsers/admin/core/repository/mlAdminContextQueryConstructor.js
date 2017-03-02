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
  }

  contextQuery()
  {
    let query={};
    let hierarchy=null;
    let userProfile=new MlAdminUserContext().userProfileDetails(this.userId);

    if(!userProfile||!userProfile.hierarchyLevel){
        throw new Error("Invalid User,Default Profile is not available");
    }

    hierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});

    if(!hierarchy){
      throw new Error("Invalid Request,Hierarchy Level could not be resolved");
    }
    //Platform Admin Hierarchy
    if(hierarchy.isParent===true){
      return query;
      //Cluster Admin
    }else if(userProfile&&userProfile.defaultProfileHierarchyCode===hierarchy.code){
           if(_.toLower(this.module)===_.toLower(hierarchy.module)){
             query["_id"]=userProfile.defaultProfileHierarchyRefId;
           }else{
             query[hierarchy.moduleFieldRef]=userProfile.defaultProfileHierarchyRefId;
           }

          return query;
      }

  }

}

module.exports = MlAdminContextQueryConstructor
