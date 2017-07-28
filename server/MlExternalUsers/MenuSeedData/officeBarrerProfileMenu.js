/**
 * Created by venkatsrinag on 14/7/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlOfficeBarrerProfileMenu"}, {$set:{
    "name":"mlOfficeBarrerProfileMenu",
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
        "image": "ml ml-institutions",
        "link": "/app/myOffice",
        "isLink": true,
        "isMenu": true,
        "name": "My Office",
        "uniqueId": "myOffice",
        "hideSubMenu": true,
        "subMenu": [{
          "link": "/app/addOffice",
          "isLink": true,
          "isMenu": false,
          "name": "Add Office",
          "uniqueId": "addOffice",
          "subMenusId": "myOffice"
        }]
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
      }
    ]
  }})
}
