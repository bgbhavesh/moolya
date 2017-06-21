/**
 * Created by venkatsrinag on 12/6/17.
 */
if(Meteor.isServer){
    MlMenus.upsert({name:"mlExploreMenu"}, {$set:{
        "name":"mlExploreMenu",
        "menu" : [
            {
              "image":"ml ml-ideator",
              "link": "/app/ideator",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Ideator",
              "uniqueId" : "ideator"
            },
            {
              "image":"ml ml-startup",
              "link": "/app/startup",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Startup",
              "uniqueId" : "startup"
            },

            {
              "image":"ml ml-funder",
              "link": "/app/funder",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Funder",
              "uniqueId" : "funder"
            },

            {
              "image":"ml ml-provider",
              "link": "provider",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Service Provider",
              "uniqueId" : "provider"
            },

            {
              "image":"ml ml-company",
              "link": "company",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Company",
              "uniqueId" : "company"
            },

            {
              "image":"ml ml-institutions",
              "link": "/app/institutions",
              "isLink" : true,
              "isMenu" : true,
              "name" : "Institutions",
              "uniqueId" : "institutions"
            }
        ]
    }});
}
