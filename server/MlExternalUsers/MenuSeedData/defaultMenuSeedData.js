/**
 * Created by venkatsrinag on 26/4/17.
 */

if(Meteor.isServer){
    MlMenus.upsert({name:"mlDefaultMenu"}, {$set:{
        "name":"mlDefaultMenu",
        "menu" : [
            {
                "image":"ml ml-dashboard",
                "link": "/app/dashboard",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Dashboard",
                "uniqueId" : "dashboard"
            },
            {
                "image":"ml ml-ideator",
                "link": "/app/ideator",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Ideators",
                "uniqueId" : "ideator"
            },
            {
                "image":"ml ml-startup",
                "link": "/app/startup",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Startups",
                "uniqueId" : "startup"
            },

            {
                "image":"ml ml-funder",
                "link": "/app/funder",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Investors",
                "uniqueId" : "funder"
            },
            // {
            //   "image":"fa fa-calendar",
            //   "link": "/app/calendar",
            //   "isLink" : true,
            //   "isMenu" : true,
            //   "name" : "Calender",
            //   "uniqueId" : "calender"
            // },
            {
                "image":"ml my-ml-Service-Providers",
                "link": "/app/serviceProvider",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Service Providers",
                "uniqueId" : "provider"
            },

            {
                "image":"ml ml-company",
                "link": "/app/company",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Companies",
                "uniqueId" : "company"
            },

            {
                "image":"ml ml-institutions",
                "link": "/app/institutions",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Institutions",
                "uniqueId" : "institutions"
            },

            {
                "image":"ml ml-chat",
                "link": "/app/conversations",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Conversations",
                "uniqueId" : "conversations"
            },

            {
                "image":"ml my-ml-subscriptions",
                "link": "/app/subscriptions",
                "isLink" : true,
                "isMenu" : true,
                "name" : "Subscriptions",
                "uniqueId" : "subscriptions"
            },

            {
                "image":"ml ml-news",
                "link": "/app/news",
                "isLink" : true,
                "isMenu" : true,
                "name" : "News",
                "uniqueId" : "news"
            },
            {
              "image":"ml my-ml-transactions",
              "link": "/app/transaction",
              "isLink" : true,
              "isMenu" : true,
              "name" : "My Transactions",
              "uniqueId" : "myTransaction"
            },
            // {
            //   "image":"fa fa-calendar-check-o",
            //   "link": "/app/task",
            //   "isLink" : true,
            //   "isMenu" : true,
            //   "name" : "Task",
            //   "uniqueId" : "my_task"
            // }
        ]
    }})
}
