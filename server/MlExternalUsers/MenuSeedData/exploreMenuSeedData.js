/**
 * Created by venkatsrinag on 12/6/17.
 */
if(Meteor.isServer){
    MlMenus.upsert({name:"mlExploreMenu"}, {$set:{
        "name":"mlExploreMenu",
        "menu" : [
            {
              "image":"ml ml-ideator",
              "link": "/app/explore",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Ideator",
              "uniqueId" : "explore_ideator"
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
              "link": "/app/explore/funder",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Funder",
              "uniqueId" : "explore_funder"
            },

            {
              "image":"ml ml-provider",
              "link": "/app/explore/provider",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Service Provider",
              "uniqueId" : "explore_provider"
            },

            {
              "image":"ml ml-company",
              "link": "/app/explore/company",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Company",
              "uniqueId" : "explore_company"
            },

            {
              "image":"ml ml-institutions",
              "link": "/app/explore/institutions",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Institutions",
              "uniqueId" : "explore_institutions"
            }
        ]
    }});
}
