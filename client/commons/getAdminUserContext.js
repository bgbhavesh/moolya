/**
 * Created by venkatasrinag on 21/3/17.
 */

import _ from "lodash";

export function getAdminUserContext()
{
    let user = Meteor.user();
    let hierarchyLevel = null, hierarchyCode = null, defaultCluster = null, isMoolya = null, communityCode=null, roleName=null;
    if(user && user.profile && user.profile.isInternaluser == true)
    {
      let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
      let user_roles;
      let default_User_Profiles=_.find(user_profiles, {'isDefault': true });
      if(default_User_Profiles){
        for(var i = 0; i < user_profiles.length; i++){
          if(user_profiles[i].isDefault == true){
            user_roles = user_profiles[i].userRoles;
            defaultCluster=user_profiles[i].clusterId;
            break;
          }
        }
      }else{ //else pick the first profile
        user_roles=user_profiles&&user_profiles[0]&&user_profiles[0].userRoles?user_profiles[0].userRoles:[];
        defaultCluster=user_profiles&&user_profiles[0]?user_profiles[0]["clusterId"]:null;
      }

      if(user_roles && user_roles.length > 0)
      {
        user_roles.map(function (userRole) {
          if(!hierarchyLevel){
            hierarchyLevel=userRole.hierarchyLevel;
            hierarchyCode=userRole.hierarchyCode;
            communityCode=userRole.communityCode;
          }else if(hierarchyLevel&&hierarchyLevel<userRole.hierarchyLevel){
            hierarchyLevel=userRole.hierarchyLevel;
            hierarchyCode=userRole.hierarchyCode;
            communityCode=userRole.communityCode
          }
          roleName = userRole.roleName
        })
      }
      isMoolya = user.profile.isMoolya;
    }

  return {hierarchyCode:hierarchyCode, hierarchyLevel:hierarchyLevel, clusterId:defaultCluster, isMoolya: isMoolya, communityCode:communityCode, roleName:roleName}
}

