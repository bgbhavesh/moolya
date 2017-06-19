if(Meteor.isServer){
  let portfolioFilterExists = MlFiltersCatalog.findOne({"moduleName":"portfolio"});
  if(!portfolioFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "portfolio",
      "moduleName":"portfolio"
    },{$set:{
      fields:[
        {
          name:"portfolioUserName",
          type:'String',
          resolverName : " "
        },
        {
          name:"clusterId",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"chapterId",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"subChapterId",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"communityCode",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"transactionType",
          type:'List',
          resolverName : "Gen_TransactionType",
          isDynamic:true
        },
        {
          name:"isActive",
          type:'Boolean',
          resolverName : "Gen_isActive",
          isDynamic:true
        },
        {
          name:"accountType",
          type:'List',
          resolverName : "Gen_SubscriptionType",
          isDynamic:true
        },
        {
          name:"createdBy",
          type:'String',
          resolverName : " "
        },
        {
          name:"portfolioUserName",
          type:'String',
          resolverName : " "
        },
      ]
    }});
  }


  let registrationFilterExists = MlFiltersCatalog.findOne({"moduleName":"registration"});
  if(!registrationFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "registration",
      "moduleName":"registration"
    },{$set:{
      fields:[
        {
          name:"registrationInfo.registrationDate",
          type:'Date',
          resolverName : " "
        },
        {
          name:"registrationInfo.firstName",
          type:'String',
          resolverName : " "
        },
        {
          name:"registrationInfo.clusterId",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"registrationInfo.chapterId",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"registrationInfo.subChapterId",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"registrationInfo.communityDefCode",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"registrationInfo.transactionType",
          type:'List',
          resolverName : "Gen_TransactionType",
          isDynamic:true
        },
        {
          name:"registrationInfo.createdBy",
          type:'String',
          resolverName : " "
        },
        {
          name:"registrationInfo.email",
          type:'String',
          resolverName : " "
        },
        {
          name:"allocation.assignee",
          type:'String',
          resolverName : "",
        }


      ]
    }})
  }

  let transactionLogFilterExists = MlFiltersCatalog.findOne({"moduleName":"transactionLog"});
  if(!transactionLogFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "transactionLog",
      "moduleName":"transactionLog"
    },{$set:{
      fields:[
        {
          name:"clusterId",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"chapterId",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"subChapterId",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"communityCode",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"transactionTypeName",
          type:'List',
          resolverName : "Gen_TransactionType",
          isDynamic:true
        }
      ]
    }});
  }


  let internalRequestFilterExists = MlFiltersCatalog.findOne({"moduleName":"internalRequests"});
  if(!internalRequestFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "internalRequests",
      "moduleName":"internalRequests"
    },{$set:{
      fields:[
        {
          name:"cluster",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"chapter",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"subChapter",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"community",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"transactionTypeName",
          type:'List',
          resolverName : "Gen_TransactionType",
          isDynamic:true
        },
        {
          name:"transactionCreatedDate",
          type:'Date',
          resolverName : " ",
          isDynamic:true
        },
        {
          name:"createdBy",
          type:'String',
          resolverName : " "
        },
        {
          name:"emailId",
          type:'String',
          resolverName : " "
        }


      ]
    }});
  }

  let approvedRequestFilterExists = MlFiltersCatalog.findOne({"moduleName":"internalApprovedRequests"});
  if(!approvedRequestFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "internalApprovedRequests",
      "moduleName":"internalApprovedRequests"
    },{$set:{
      fields:[
        {
          name:"cluster",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"chapter",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"subChapter",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"community",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"transactionCreatedDate",
          type:'Date',
          resolverName : " ",
          isDynamic:true
        },
        {
          name:"transactionTypeName",
          type:'List',
          resolverName : "Gen_TransactionType",
          isDynamic:true
        },
        {
          name:"createdBy",
          type:'String',
          resolverName : " "
        },
        {
          name:"emailId",
          type:'String',
          resolverName : " "
        },
      ]
    }});
  }


  let processDocumentsFilterExists = MlFiltersCatalog.findOne({"moduleName":"documents"});
  if(!processDocumentsFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "documents",
      "moduleName":"documents"
    },{$set:{
      fields:[
        {
          name:"clusters",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"chapters",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"subChapters",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"communities",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"date",
          type:'Date',
          resolverName : " ",
          isDynamic:true
        }
      ]
    }});
  }

  let templateAssignmentFilterExists = MlFiltersCatalog.findOne({"moduleName":"templateAssignment"});
  if(!templateAssignmentFilterExists){
    MlFiltersCatalog.upsert({
      "_id" : "templateAssignment",
      "moduleName":"templateAssignment"
    },{$set:{
      fields:[
        {
          name:"templateclusterId",
          type:'List',
          resolverName : "Gen_Clusters",
          isDynamic:true
        },
        {
          name:"templatechapterId",
          type:'List',
          resolverName : "Gen_Chapters",
          isDynamic:true
        },
        {
          name:"templatesubChapterId",
          type:'List',
          resolverName : "Gen_SubChapters",
          isDynamic:true
        },
        {
          name:"templatecommunityCode",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:true
        },
        {
          name:"createdDate",
          type:'Date',
          resolverName : " ",
          isDynamic:true
        },
        {
          name:"createdBy",
          type:'String',
          resolverName : " "
        },
      ]
    }});
  }



}
