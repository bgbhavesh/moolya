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
          "fieldName" : "registrationInfo.registrationDate",
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

  //for transaction log
  let transactionLogFilterExists = MlFilters.findOne({"moduleName":"transactionLog"});
  if(!transactionLogFilterExists){
    MlFilters.upsert({"moduleName" : "transactionLog"},{$set:{
      "filterName" : "TransactionLog Filter",
      "filterDescription" : "TransactionLog Filter",
      "isActive" : true,
      "moduleName" : "transactionLog",
      "filterFields" : [
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
          "fieldName" : "communityId",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "createdAt",
          "displayName" : "Created Date",
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null,
          "isActive":true
        },

      ]
    }});
  }

  //for internalRequests
  let internalRequestFilterExists = MlFilters.findOne({"moduleName":"internalRequests"});
  if(!internalRequestFilterExists){
    MlFilters.upsert({"moduleName" : "internalRequests"},{$set:{
      "filterName" : "Internal Request Filter",
      "filterDescription" : "Internal Request Filter",
      "isActive" : true,
      "moduleName" : "internalRequests",
      "filterFields" : [
        {
          "fieldName" : "cluster",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters",
          "isActive":true
        },
        {
          "fieldName" : "chapter",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true
        },
        {
          "fieldName" : "subChapter",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters",
          "isActive":true
        },
        {
          "fieldName" : "community",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "transactionCreatedDate",
          "displayName" : "Created Date",
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null,
          "isActive":true
        },

      ]
    }});
  }

  //for approvedRequests
  let approvedRequestFilterExists = MlFilters.findOne({"moduleName":"internalApprovedRequests"});
  if(!approvedRequestFilterExists){
    MlFilters.upsert({"moduleName" : "internalApprovedRequests"},{$set:{
      "filterName" : "Internal Approved Request Filter",
      "filterDescription" : "Internal Approved Request Filter",
      "isActive" : true,
      "moduleName" : "internalApprovedRequests",
      "filterFields" : [
        {
          "fieldName" : "cluster",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters",
          "isActive":true
        },
        {
          "fieldName" : "chapter",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true
        },
        {
          "fieldName" : "subChapter",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters",
          "isActive":true
        },
        {
          "fieldName" : "community",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "transactionCreatedDate",
          "displayName" : "Created Date",
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null,
          "isActive":true
        },

      ]
    }});
  }
}
