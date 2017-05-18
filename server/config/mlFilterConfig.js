if(Meteor.isServer){
  //for registration
  let registrationFilterExists = MlFilters.findOne({"moduleName":"registration"});
  if(!registrationFilterExists){
    MlFilters.upsert({"moduleName" : "registration"},{$set:{
      "filterName" : "Registration Filter",
      "filterDescription" : "Registration Filter",
      "isActive" : true,
      "moduleName" : "registration",
      "filterFields" : [
        {
          "fieldName" : "createdDate",
          "displayName" : "Created Date",
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null,
          "isActive":true
        },
        {
          "fieldName" : "registrationInfo.firstName",
          "displayName" : "First Name",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,

        },
        {
          "fieldName" : "registrationInfo.clusterId",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters",
          "isActive":true
        },
        {
          "fieldName" : "registrationInfo.chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true
        },
        {
          "fieldName" : "registrationInfo.subChapterId",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters",
          "isActive":true
        },
        {
          "fieldName" : "registrationInfo.communityDefName",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        }

      ]
    }});

  }


  //for portfolio
  let portfolioFilterExists = MlFilters.findOne({"moduleName":"portfolio"});
  if(!portfolioFilterExists){
    MlFilters.upsert({"moduleName" : "portfolio"},{$set:{
      "filterName" : "Portfolio Filter",
      "filterDescription" : "Portfolio Filter",
      "isActive" : true,
      "moduleName" : "portfolio",
      "filterFields" : [
        {
          "fieldName" : "portfolioUserName",
          "displayName" : "User Name",
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
          "isActive":true
        },
        {
          "fieldName" : "clusterId",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters",
          "isActive":true
        },
        {
          "fieldName" : "chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true
        },
        {
          "fieldName" : "subChapterId",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters",
          "isActive":true
        },
        {
          "fieldName" : "communityType",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "isActive",
          "displayName" : "isActive??",
          "isDynamic" : true,
          "fieldType" : "Boolean",
          "fieldResolverName" : "Gen_isActive",
          "isActive":true
        }
      ]
    }});
  }

}
