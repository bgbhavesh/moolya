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
          name:"communityType",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:false
        },
        {
          name:"identityType",
          type:'List',
          resolverName : "Gen_IdentityType",
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
        }
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
          name:"createdDate",
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
          resolverName : "Reg_Clusters",
          isDynamic:true
        },
        {
          name:"registrationInfo.chapterId",
          type:'List',
          resolverName : "Reg_Chapters",
          isDynamic:true
        },
        {
          name:"registrationInfo.subChapterId",
          type:'List',
          resolverName : "Reg_SubChapters",
          isDynamic:true
        },
        {
          name:"registrationInfo.communityDefName",
          type:'List',
          resolverName : "Gen_Community",
          isDynamic:false
        },
        {
          name:"registrationInfo.identityType",
          type:'List',
          resolverName : "Gen_IdentityType",
          isDynamic:true
        }
      ]
    }})
  }


  MlFiltersCatalog.upsert({
    "_id" : "requests",
    "moduleName":"requests"
  },{$set:{
    fields:[
      {
        name:"createdDate",
        type:'Date'
      },
      {
        name:"requestType",
        type:'String'
      },
      {
        name:"transactionType",
        type:'String'
      }]
  }})
}
