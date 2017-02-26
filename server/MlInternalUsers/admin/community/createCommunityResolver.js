import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'


MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) =>{
    check(args.community, Object)
        //TODO : Duplicate Community Identification
        // TODO : Authorization
        let id = MlCommunity.insert({...args.community});
        if(id){
            let code = 200;
            let result = {communityId: id}
            var response= JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response;
        }

}
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
MlResolver.MlQueryResolver['fetchCommunityDef'] = (obj, args, context, info) => {
  // TODO : Authorization

  let communityData=MlCommunityDefinition.find({isActive:true}).fetch();
  return {data:communityData};
}
