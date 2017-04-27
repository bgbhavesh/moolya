/**
 * Created by venkatsrinag on 26/4/17.
 */

if(Meteor.isServer){
    MlMenus.upsert({name:"defaultMenu"}, {$set:{
        "name":"mlDefaultMenu",
        "menu" : [
            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "dashboard",
            },
            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Ideator",
            },
            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Startup",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Funder",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Provider",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Company",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Institutions",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Conversations",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Subscriptions",
            },

            {
                "image":"/images/db_icon.png",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "News",
            },
        ]
    }})
}
