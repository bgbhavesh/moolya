/**
 * Created by mohammed.mohasin on 2/02/17.
 */

var _ = require('lodash');

class MlAdminUserContext
{
  constructor(userId){
    this.userId=userId;
  }

  userProfileDetails(userId)
  {
   check(userId, String)
    let hierarchyLevel =null;
    let hierarchyCode=null;
    let defaultCluster=null;
    let defaultChapters = [];
    let defaultSubChapters = [];
    let defaultCommunities = [];
    var user = Meteor.users.findOne({_id:userId});
    if(user && user.profile && user.profile.isInternaluser == true)
    {
      let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
      let user_roles;
      // Selecting Default Profile
      let default_User_Profiles=_.find(user_profiles, {'isDefault': true });
      //if default Profile is available then,
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
            }else if(hierarchyLevel&&hierarchyLevel<userRole.hierarchyLevel){
                hierarchyLevel=userRole.hierarchyLevel;
                hierarchyCode=userRole.hierarchyCode;
            }
            defaultChapters.push(userRole.chapterId)
            defaultSubChapters.push(userRole.subChapterId)
            defaultCommunities.push(userRole.communityId)
          })

      }
    }
        return {hierarchyLevel:hierarchyLevel,hierarchyCode:hierarchyCode,
                defaultProfileHierarchyCode:"CLUSTER",
                defaultProfileHierarchyRefId:defaultCluster,
                defaultChapters:defaultChapters,
                defaultSubChapters:defaultSubChapters,
                defaultCommunities:defaultCommunities};
  }

  getDefaultMenu(userId){
       check(userId,String);
        let userProfile=this.userProfileDetails(userId)||{};
        let hierarchy=null;
    if(userProfile&& (userProfile.hierarchyLevel || userProfile.hierarchyLevel ==0)){
      hierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
      return hierarchy&&hierarchy.menuName?hierarchy.menuName:null;
    }
    //return default menu
       return null;
  }
  getDefaultCountry(userId){
    check(userId,String);
    let userProfile=this.userProfileDetails(userId)||{};
    if(userProfile&&userProfile.defaultProfileHierarchyCode&&userProfile.defaultProfileHierarchyCode==="CLUSTER"){
      let defaultProfileHierarchyRefId=userProfile.defaultProfileHierarchyRefId;
      let clusterDetails=MlClusters.findOne(defaultProfileHierarchyRefId);
      if(clusterDetails&&clusterDetails.countryId){
         let countryDetails=MlCountries.findOne(clusterDetails.countryId);
        return {countryId:countryDetails._id,countryCode:countryDetails.countryCode,countryName:countryDetails.country};
      }

    }
    return {};
  }
}

module.exports = MlAdminUserContext
