/**
 * Created by venkatasrinag on 21/2/17.
 */

const clusterRoutes={
  clusterDetailsRoute:(clusterId, route)=> {
    return `/admin/clusters/${clusterId}/clusterDetails`;
  },

  chapterListRoute:(clusterId)=>{
    return `/admin/clusters/${clusterId}/chapters`;
  },
  subChapterListRoute:(clusterId,chapterId,router) =>{
    return `/admin/clusters/${clusterId}/${chapterId}/subChapters`;
  },
  communityListRoute:(clusterId,chapterId,subChapterId,router)=>{
    return `/admin/clusters/${clusterId}/${chapterId}/${subChapterId}/communities`;
  }
}

export default clusterRoutes;
