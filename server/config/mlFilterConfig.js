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
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null
        },
        {
          "fieldName" : "registrationInfo.firstName",
          "displayName" : "First Name",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null
        },
        {
          "fieldName" : "registrationInfo.clusterId",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Reg_Clusters"
        },
        {
          "fieldName" : "registrationInfo.chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Reg_Chapters"
        },
        {
          "fieldName" : "registrationInfo.subChapterId",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Reg_SubChapters"
        },
        {
          "fieldName" : "registrationInfo.identityType",
          "displayName" : "Identity",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_IdentityType"
        },
        {
          "fieldName" : "registrationInfo.communityDefName",
          "displayName" : "Community",
          "isDynamic" : false,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isCustom" : false
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
          "fieldResolverName" : null
        },
        {
          "fieldName" : "clusterId",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters"
        },
        {
          "fieldName" : "chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters"
        },
        {
          "fieldName" : "subChapterId",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters"
        },
        {
          "fieldName" : "identityType",
          "displayName" : "Identity",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_IdentityType"
        },
        {
          "fieldName" : "communityType",
          "displayName" : "Community",
          "isDynamic" : false,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
        },
        {
          "fieldName" : "isActive",
          "displayName" : "isActive??",
          "isDynamic" : false,
          "fieldType" : "Boolean",
          "fieldResolverName" : "Gen_isActive"
        },
        {
          "fieldName" : "accountType",
          "displayName" : "Subscription Type",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubscriptionType"
        }
      ]
    }});
  }

}
