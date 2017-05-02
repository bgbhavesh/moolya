/**
 * Created by venkatsrinag on 2/5/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlDefaultProfileMenu"}, {$set:{
      "name":"mlDefaultProfileMenu",
      "menu" : [
          {
            "link": "/app/myProfile",
            "isLink" : true,
            "isMenu" : true,
            "name" : "My Profile",
            "uniqueId" : "myProfile"
          },
          {
            "link": "/app/addressBook",
            "isLink" : true,
            "isMenu" : true,
            "name" : "Address Book",
            "uniqueId" : "addressBook"
          },
          {
            "link": "/app/portfolio",
            "isLink" : true,
            "isMenu" : true,
            "name" : "My Portfolio",
            "uniqueId" : "portfolio"
          },
          {
            "link": "/app/myConnections",
            "isLink" : true,
            "isMenu" : true,
            "name" : "My Connections",
            "uniqueId" : "myConnections"
          },
          {
            "link": "/app/referalInvities",
            "isLink" : true,
            "isMenu" : true,
            "name" : "Referal & Invities",
            "uniqueId" : "referalInvities"
          },
          {
            "link": "/app/library",
            "isLink" : true,
            "isMenu" : true,
            "name" : "Library",
            "uniqueId" : "library"
          },
          {
            "link": "/app/mySubscriptions",
            "isLink" : true,
            "isMenu" : true,
            "name" : "My Subscriptions",
            "uniqueId" : "mySubscriptions"
          },
          {
            "link": "/app/settings",
            "isLink" : true,
            "isMenu" : true,
            "name" : "Settings",
            "uniqueId" : "settings"
          },
          {
            "link": "/app/termsConditions",
            "isLink" : true,
            "isMenu" : true,
            "name" : "T & C",
            "uniqueId" : "termsConditions"
          },
          {
            "link": "/app/privacy",
            "isLink" : true,
            "isMenu" : true,
            "name" : "Privacy",
            "uniqueId" : "privacy"
          },


      ]
  }})
}
