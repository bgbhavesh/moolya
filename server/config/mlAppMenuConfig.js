/**
 * Created by venkatsrinag on 9/6/17.
 */

Meteor.startup(function () {

    let menus = [
        {communityCode:"FUN", communityName:"funder", menuName:"mlFunderMenu", isActive:true, isProfileMenu:false, isExploreMenu:true},
        {communityCode:"IDE", communityName:"ideator", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false, isExploreMenu:false},
        {communityCode:"STU", communityName:"startup", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false, isExploreMenu:false},
        {communityCode:"CMP", communityName:"company", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false, isExploreMenu:false},
        {communityCode:"INS", communityName:"institution", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false, isExploreMenu:false},
        {communityCode:"SPS", communityName:"serviceprovider", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false, isExploreMenu:false},
        {communityCode:"OFB", communityName:"officebarrer", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false, isExploreMenu:false},
        // {communityCode:"FUN", communityName:"funder", menuName:"mlExploreMenu", isActive:true, isProfileMenu:false, isExploreMenu:true},
        {communityCode:"BRW", communityName:"Browsers", menuName:"mlBrowserMenu", isActive:true, isProfileMenu:false, isExploreMenu:true},
    ]

    for(var i = 0; i < menus.length; i++){
        let menu =   MlAppMenuConfig.findOne({"$and":[{menuName: menus[i].menuName}, {communityCode: menus[i].communityCode}]});
        if(!menu){
            menu = {communityCode:menus[i].communityCode, communityName:menus[i].communityName, menuName:menus[i].menuName, isActive:menus[i].isActive, isProfileMenu:menus[i].isProfileMenu, isExploreMenu:menus[i].isExploreMenu};
            MlAppMenuConfig.insert(menu);
        }
    }

});
