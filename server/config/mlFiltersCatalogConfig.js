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
        collectionName : "Clusters"
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
        collectionName : " "
      },
      {
        name:"registrationInfo.firstName",
        type:'String',
        collectionName : " "
      },
      {
        name:"registrationInfo.clusterId",
        type:'List',
        collectionName : "Clusters"
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
