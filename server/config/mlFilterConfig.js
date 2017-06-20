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
          "isActive":true,
          "clearFields" : ["registrationInfo.chapterId","registrationInfo.subChapterId"]
        },
        {
          "fieldName" : "registrationInfo.chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["registrationInfo.subChapterId"]
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
          "fieldName" : "registrationInfo.communityDefCode",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "registrationInfo.transactionType",
          "displayName" : "Transaction Type",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_TransactionType",
          "isActive":true
        },
        {
          "fieldName" : "registrationInfo.createdBy",
          "displayName" : "Created By",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },
        {
          "fieldName" : "registrationInfo.email",
          "displayName" : "Email",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },
        {
          "fieldName" : "allocation.assignee",
          "displayName" : "Assigned To",
          "isDynamic" : true,
          "fieldType" : "String",
          "fieldResolverName" : "null",
          "isActive":true
        },

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
          "isActive":true,
          "clearFields" : ["chapterId","subChapterId"]
        },
        {
          "fieldName" : "chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["subChapterId"]
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
          "fieldName" : "communityCode",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "transactionType",
          "displayName" : "Transaction Type",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_TransactionType",
          "isActive":true
        },
       /* {
          "fieldName" : "isActive",
          "displayName" : "isActive??",
          "isDynamic" : true,
          "fieldType" : "Boolean",
          "fieldResolverName" : "Gen_isActive",
          "isActive":true
        },*/
        {
          "fieldName" : "createdBy",
          "displayName" : "Created By",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },
        {
          "fieldName" : "portfolioUserName",
          "displayName" : "Contact Email",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },
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
          "isActive":true,
          "clearFields" : ["chapterId","subChapterId"]
        },
        {
          "fieldName" : "chapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["subChapterId"]
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
          "fieldName" : "communityCode",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "transactionTypeName",
          "displayName" : "Transaction Type",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_TransactionType",
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
          "isActive":true,
          "clearFields" : ["chapter","subChapter"]
        },
        {
          "fieldName" : "chapter",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["subChapter"]
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
          "fieldName" : "transactionTypeName",
          "displayName" : "Transaction Type",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_TransactionType",
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
        {
          "fieldName" : "createdBy",
          "displayName" : "Created By",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },
        {
          "fieldName" : "emailId",
          "displayName" : "Email",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        }

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
          "isActive":true,
          "clearFields" : ["chapter","subChapter"]
        },
        {
          "fieldName" : "chapter",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["subChapter"]
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
          "fieldName" : "transactionTypeName",
          "displayName" : "Transaction Type",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_TransactionType",
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
        {
          "fieldName" : "createdBy",
          "displayName" : "Created By",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },
        {
          "fieldName" : "emailId",
          "displayName" : "Email",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        }

      ]
    }});
  }

  //for process documents
  let processDocumentsFilterExists = MlFilters.findOne({"moduleName":"documents"});
  if(!processDocumentsFilterExists){
    MlFilters.upsert({"moduleName" : "documents"},{$set:{
      "filterName" : "Documents",
      "filterDescription" : "Documents Filter",
      "isActive" : true,
      "moduleName" : "documents",
      "filterFields" : [
        {
          "fieldName" : "clusters",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters",
          "isActive":true,
          "clearFields" : ["chapters","subChapters"]
        },
        {
          "fieldName" : "chapters",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["subChapter"]
        },
        {
          "fieldName" : "subChapters",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters",
          "isActive":true
        },
        {
          "fieldName" : "communities",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "date",
          "displayName" : "Created Date",
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null,
          "isActive":true
        },

      ]
    }});
  }

  //for template assignment
  let templateAssignmentFilterExists = MlFilters.findOne({"moduleName":"templateAssignment"});
  if(!templateAssignmentFilterExists){
    MlFilters.upsert({"moduleName" : "templateAssignment"},{$set:{
      "filterName" : "Templates",
      "filterDescription" : "Templates Filter",
      "isActive" : true,
      "moduleName" : "templateAssignment",
      "filterFields" : [
        {
          "fieldName" : "templateclusterId",
          "displayName" : "Cluster",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Clusters",
          "isActive":true,
          "clearFields" : ["templatechapterId","templatesubChapterId"]
        },
        {
          "fieldName" : "templatechapterId",
          "displayName" : "Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Chapters",
          "isActive":true,
          "clearFields" : ["subChapter"]
        },
        {
          "fieldName" : "templatesubChapterId",
          "displayName" : "Sub Chapter",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_SubChapters",
          "isActive":true
        },
        {
          "fieldName" : "templatecommunityCode",
          "displayName" : "Community",
          "isDynamic" : true,
          "fieldType" : "List",
          "fieldResolverName" : "Gen_Community",
          "isActive":true
        },
        {
          "fieldName" : "createdDate",
          "displayName" : "Created Date",
          "isDynamic" : null,
          "fieldType" : "Date",
          "fieldResolverName" : null,
          "isActive":true
        },
        {
          "fieldName" : "createdBy",
          "displayName" : "Created By",
          "isActive" : true,
          "isDynamic" : null,
          "fieldType" : "String",
          "fieldResolverName" : null,
        },

      ]
    }});
  }
}
