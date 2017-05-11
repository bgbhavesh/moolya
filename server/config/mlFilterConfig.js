if(Meteor.isServer){
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
        "fieldResolverName" : "Gen_Chapters"
      },
      {
        "fieldName" : "registrationInfo.subChapterId",
        "displayName" : "Sub Chapter",
        "isDynamic" : true,
        "fieldType" : "List",
        "fieldResolverName" : "Gen_SubChapters"
      },
      {
        "fieldName" : "registrationInfo.communityDefName",
        "displayName" : "Community",
        "isDynamic" : false,
        "fieldType" : "List",
        "fieldResolverName" : "Reg_Community",
        "isCustom" : false
      },
      {
        "fieldName" : "registrationInfo.identityType",
        "displayName" : "Identity",
        "isDynamic" : false,
        "fieldType" : "List",
        "fieldResolverName" : "Reg_IdentityType"
      }
    ]
  }});
}
