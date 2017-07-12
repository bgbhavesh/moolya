/**
 * Created by venkatsrinag on 11/7/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlBrowserProfileMenu"}, {$set:{
    "name":"mlBrowserProfileMenu",
    "menu" : [
      {
        "image":"fa fa-user-circle-o",
        "link": "/app/myProfile",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Profile",
        "uniqueId" : "myProfile"
      },
      {
        "image":"ml ml-address-book",
        "link": "/app/addressBook",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Address Book",
        "uniqueId" : "addressBook"
      },
      {
        "image":"ml ml-portfolio",
        "link": "/app/portfolio",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Portfolio",
        "uniqueId" : "portfolio"
      },
      {
        "image":"fa fa-list",
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
        "image":"ml ml-library",
        "link": "/app/library",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Library",
        "uniqueId" : "library"
      },
      {
        "image":"ml ml-subscribe",
        "link": "/app/mySubscriptions",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Subscriptions",
        "uniqueId" : "mySubscriptions"
      },
      {
        "image":"ml ml-settings",
        "link": "/app/settings",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Settings",
        "uniqueId" : "settings"
      },
      {
        "image":"ml ml-moolya-symbol",
        "link": "/app/termsConditions",
        "isLink" : true,
        "isMenu" : true,
        "name" : "T & C",
        "uniqueId" : "termsConditions"
      },
      {
        "image":"ml ml-moolya-symbol",
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