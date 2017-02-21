/**
 * Created by venkatasrinag on 21/2/17.
 */

const clusterRoutes={
  clusterDetailsRoute:(clusterId, route)=> {
    return `/admin/clusters/${clusterId}`;
  }
  // chapterListRoute:(clusterId)=>{
  //   return `/admin/dashboard/${clusterId}/chapters`;
  // },
  // subChapterListRoute:(clusterId,chapterId,router) =>{
  //   return `/admin/dashboard/${clusterId}/${chapterId}/subChapters`;
  // },
  // communityListRoute:(clusterId,chapterId,subChapterId,router)=>{
  //   return `/admin/subChapters/${clusterId}/${chapterId}/${subChapterId}`;
  // }
}

export default clusterRoutes;
