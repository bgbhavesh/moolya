/**
 * Created by venkatsrinag on 9/6/17.
 */

Meteor.startup(function () {

    let menus = [
        {communityCode:"FUN", communityName:"funder", menuName:"mlFunderMenu", isActive:true, isProfileMenu:false},
        {communityCode:"IDE", communityName:"ideator", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false},
        {communityCode:"STU", communityName:"startup", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false},
        {communityCode:"CMP", communityName:"company", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false},
        {communityCode:"INS", communityName:"institution", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false},
        {communityCode:"SPS", communityName:"serviceprovider", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false},
        {communityCode:"OFB", communityName:"officebarrer", menuName:"mlDefaultMenu", isActive:true, isProfileMenu:false}
    ]

    for(var i = 0; i < menus.length; i++){
        let menu =   MlAppMenuConfig.findOne({menuName: menus[i].menuName});
        if(!menu){
            menu = {communityCode:menus[i].communityCode, communityName:menus[i].communityName, menuName:menus[i].menuName, isActive:menus[i].isActive, isProfileMenu:menus[i].isProfileMenu};
            MlAppMenuConfig.insert(menu);
        }
    }

});
