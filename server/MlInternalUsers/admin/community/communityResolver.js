import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'


// MlResolver.MlMutationResolver['updateCommunityDef'] = (obj, args, context, info) =>{
//     // check(args.communityDef, Object)
//         //TODO : Duplicate Community Identification
//         // TODO : Authorization
//         // let communityDef = MlCommunityDefinition.findOne({_id:args.community.communityDefId});
//         // let community = {...args.community, communityDefCode: communityDef.code, communityDefName:communityDef.name};
//         // let id = MlCommunity.insert({...communityDef});
//         if (args._id) {
//           var id= args._id;
//           let updatedResponse= MlCommunityDefinition.update(id, {$set: args.communityDef});
//           return updatedResponse
//         }
//         // if(id){
//         //     let code = 200;
//         //     let result = {communityId: id}
//         //     var response= JSON.stringify(new MlRespPayload().successPayload(result, code));
//         //     return response;
//         // }
//
// }
MlResolver.MlQueryResolver['FetchMapData'] = (obj, args, context, info) => {
  // TODO : Authorization
  let query={};
  switch(args.moduleName){
    case "cluster":
      query={"clusterId":args.id};
      break;
    case "chapter":
      query={"chapterId":args.id};
      break;
    case "subChapter":
      query={"subChapterId":args.id};
      break;
    case "community":
      query={"communityDefId":args.id};
      break;
    default:
      query={"noSuchQuery":args.id};
  }
  query.isActive=true;
  let communityData=MlCommunityDefinition.find({isActive:true}).fetch();
  let response=[];
  _.each(communityData,function (item,value) {
    query.communityDefId=item._id;
    response.push({
      key: item._id,
      count: MlCommunity.find(query).count()
    })
  });
    return response;
}
// MlResolver.MlQueryResolver['fetchCommunityDefs'] = (obj, args, context, info) => {
//   // TODO : Authorization
//
//   let communityData=MlCommunityDefinition.find({isActive:true}).fetch();
//   return {data:communityData};
// }
// MlResolver.MlQueryResolver['fetchCommunityDef'] = (obj, args, context, info) => {
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let response= MlCommunityDefinition.findOne({"_id":id});
//     return response;
//   }
//
// }

MlResolver.MlQueryResolver['fetchCommunitiesDef'] = (obj, args, context, info) => {
    let result = MlCommunityDefinition.find({"isActive": true}).fetch();
    return {data:result, totalRecords:result&&result.length?result.length:0}
}

MlResolver.MlQueryResolver['fecthCommunitiesAccess'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fecthCommunityDef'] = (obj, args, context, info) => {

    let result = MlCommunityDefinition.findOne({"_id": args.communityId});
    return result;
}

MlResolver.MlQueryResolver['fecthCommunityAccess'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchActiveCommunityAccess'] = (obj, args, context, info) => {
    let result = MlCommunityAccess.find({"isActive":true}).fetch();
    return result;
}

MlResolver.MlMutationResolver['updateCommunityDef'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['updateCommunityAccess'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['createCommunityAccess'] = (obj, args, context, info) => {
    let hierarchy;
    let levelCode;
    let community = {};
    if(args.clusterId != undefined && args.chapterId != undefined && args.subChapterId != undefined ){
        levelCode = "SUBCHAPTER"
    }
    else if(args.clusterId != undefined && args.chapterId != undefined ){
        levelCode = "CHAPTER"
    }
    else if(args.clusterId != undefined){
        levelCode = "CLUSTER"
    }
    hierarchy = MlHierarchy.findOne({code:levelCode})

    let communitiesDef = MlCommunityDefinition.find().fetch();
    for(var i = 0; i < communitiesDef.length; i++){
        if(communitiesDef[i].isActive){
            let community = {
                clusterId:args.clusterId,
                chapterId:args.chapterId || null,
                subChapterId:args.subChapterId || null,
                communityId:"",
                communityDefId:communitiesDef[i]._id,
                communityDefCode:communitiesDef[i].code,
                communityDefName:communitiesDef[i].name,
                showOnMap:false,
                isRoot: false,
                isLeaf:false,
                isActive:false,
                isAvailableByParent:communitiesDef[i].isActive,
                hierarchyLevel:hierarchy.level,
                hierarchyCode:hierarchy.code
            }

            MlCommunityAccess.insert(community)
        }
    }
}

MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) => {

}
