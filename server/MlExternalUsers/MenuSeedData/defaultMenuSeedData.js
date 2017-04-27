/**
 * Created by venkatsrinag on 26/4/17.
 */

if(Meteor.isServer){
    MlMenus.upsert({name:"mlDefaultMenu"}, {$set:{
        "name":"mlDefaultMenu",
        "menu" : [
            {
                "image":"ml ml-dashboard",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Dashboard",
                "uniqueId" : "dashboard"
            },
            {
                "image":"ml ml-ideator",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Ideator",
                "uniqueId" : "ideator"
            },
            {
                "image":"ml ml-startup",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Startup",
                "uniqueId" : "startup"
            },

            {
                "image":"ml ml-funder",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Funder",
                "uniqueId" : "funder"
            },

            {
                "image":"ml ml-provider",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Provider",
                "uniqueId" : "provider"
            },

            {
                "image":"ml ml-company",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Company",
                "uniqueId" : "company"
            },

            {
                "image":"ml ml-institutions",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Institutions",
                "uniqueId" : "institutions"
            },

            {
                "image":"ml ml-chat",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Conversations",
                "uniqueId" : "conversations"
            },

            {
                "image":"ml ml-subscribe",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Subscriptions",
                "uniqueId" : "subscriptions"
            },

            {
                "image":"ml ml-news",
                "link": "",
                "isLink" : true,
                "isMenu" : true,
                "name" : "News",
                "uniqueId" : "news"
            },
        ]
    }})
}
