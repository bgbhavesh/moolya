if(Meteor.isServer){
  MlFiltersCatalog.upsert({
    "_id" : "portfolio",
    "moduleName":"portfolio"
  },{$set:{
    fields:[
      {
        name:"createdDate",
        type:'Date'
      },
      {
        name:"clusterId",
        type:'List',
        resolverName : "Clusters"
      }]
  }});
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
        resolverName : "Gen_Chapters",
        isDynamic:true
      },
      {
        name:"registrationInfo.chapterId",
        type:'List',
        resolverName : "Reg_SubChapters",
        isDynamic:true
      },
      {
        name:"status",
        type:'List',
      }
    ]
  }})
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
