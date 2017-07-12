/**
 * Created by venkatsrinag on 12/6/17.
 */
if(Meteor.isServer){
    MlMenus.upsert({name:"mlExploreMenu"}, {$set:{
        "name":"mlExploreMenu",
        "menu" : [
            {
              "image":"ml ml-ideator",
              "link": "/app/explore/ideator",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Ideator",
              "uniqueId" : "explore"
            },
            {
              "image":"ml ml-startup",
              "link": "/app/explore/startup",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Startup",
              "uniqueId" : "explore_startup"
            },

            {
              "image":"ml ml-funder",
              "link": "/app/explore/investor",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Investor",
              "uniqueId" : "explore"
            },

            {
              "image":"ml ml-provider",
              "link": "/app/explore/serviceProvider",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Service Provider",
              "uniqueId" : "explore"
            },

            {
              "image":"ml ml-company",
              "link": "/app/explore/company",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Company",
              "uniqueId" : "explore"
            },

            {
              "image":"ml ml-institutions",
              "link": "/app/explore/institutions",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Institutions",
              "uniqueId" : "explore"
            }
        ]
    }});
}
