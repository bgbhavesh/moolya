/**
 * Created by venkatsrinag on 11/7/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlBrowserProfileMenu"}, {$set:{
    "name":"mlBrowserProfileMenu",
    "menu" : [
      {
        "image":"ml my-ml-blank_Profile_3",
        "link": "/app/myProfile",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Profile",
        "uniqueId" : "myProfile"
      },
      {
        "image":"ml flaticon-ml-agenda",
        "link": "/app/addressBook",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Address Book",
        "uniqueId" : "addressBook"
      },
      {
        "image":"ml flaticon-ml-briefcase",
        "link": "/app/portfolio",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Portfolio",
        "uniqueId" : "portfolio"
      },
      {
        "image":"ml my-ml-my_list",
        "link": "/app/myConnections",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My List",
        "uniqueId" : "myConnections"
      },
      {
        "image":"fa fa-money",
        "link": "/app/referalInvities",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Referal & Invities",
        "uniqueId" : "referalInvities"
      },
      {
        "image":"ml my-ml-library_3",
        "link": "/app/library",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Library",
        "uniqueId" : "library"
      },
      {
        "image":"ml my-ml-subscriptions",
        "link": "/app/mySubscriptions",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Subscriptions",
        "uniqueId" : "mySubscriptions"
      },
      {
        "image":"ml my-ml-settings1",
        "link": "/app/settings",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Settings",
        "uniqueId" : "settings"
      },
      {
        "image":"ml my-ml-terms_and_conditions",
        "link": "/app/termsConditions",
        "isLink" : true,
        "isMenu" : true,
        "name" : "T & C",
        "uniqueId" : "termsConditions"
      },
      {
        "image":"ml my-ml-privacy",
        "link": "/app/privacy",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Privacy",
        "uniqueId" : "privacy"
      },
      {
        "image":"ml ml-moolya-symbol",
        "link": "/app/register",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Registration",
        "uniqueId" : "registeras"
      },
    ]
  }})
}
