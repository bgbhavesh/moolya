/**
 * Created by mohammed.mohasin on 09/03/2017.
 */

import MlResolver from '../mlAdminResolverDef'
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext'


MlResolver.MlQueryResolver['FetchBreadCrumHierarchyDetails'] = (obj, args, context, info) =>{
  let details=[];
  let request=args&&args.hierarchyContext?args.hierarchyContext:{};
  if(request.clusterId&&request.clusterId.trim()!==""){
       let cluster=MlClusters.findOne(request.clusterId);
       details.push({hierarchyLevel:3,hierarchyRefId:cluster._id,hierarchyRefName:cluster.clusterName,'moduleFieldRef':'clusterId'});
  }
  if(request.chapterId&&request.chapterId.trim()!==""){
    let chapter=MlChapters.findOne(request.chapterId);
    details.push({hierarchyLevel:2,hierarchyRefId:chapter._id,hierarchyRefName:chapter.chapterName,'moduleFieldRef':'chapterId'});
  }
  if(request.subChapterId&&request.subChapterId.trim()!==""){
    let subChapter=MlSubChapters.findOne(request.subChapterId);
    details.push({hierarchyLevel:1,hierarchyRefId:subChapter._id,hierarchyRefName:subChapter.subChapterName,'moduleFieldRef':'subChapterId'});
  }
  if(request.communityId&&request.communityId.trim()!==""){
    let community=MlCommunityAccess.findOne({communityDefCode:request.communityId});
    details.push({hierarchyLevel:0,hierarchyRefId:community._id,hierarchyRefName:community.communityName,'moduleFieldRef':'communityId'});
  }
  return details;
}
