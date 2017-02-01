import MlResolver from '../mlAdminResolverDef'

import MlRespPayload from '../../../commons/mlPayload'

MlResolver.MlMutationResolver['createChapter'] = (obj, args, context, info) =>{
  check(args, Object)
  check(args.clusterId, String)
  check(args.chapterName, String)
  check(args.diplayName, String)
  check(args.about, String)
  check(args.link, String)
  check(args.state, String)
  check(args.email, String)
  check(args.showOnMap, Boolean)
  check(args.isActive, Boolean)
    // TODO : Duplicate Cluster Identification
    // TODO : Authorization
    let id = MlChapters.insert(args);
    if(id){
      let code = 200;
      let result = {chapterId: id}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response;
  }
}
