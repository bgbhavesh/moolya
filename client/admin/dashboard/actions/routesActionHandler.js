
const dashboardRoutes={
  clusterDetailsRoute:(clusterId, route)=> {
    return `/admin/cluster/clusterDetails/${clusterId}`;
  },
  chapterListRoute:(clusterId)=>{
    return `/admin/dashboard/${clusterId}/chapters`;
  },
  subChapterListRoute:(clusterId,chapterId,router) =>{
    return `/admin/dashboard/${clusterId}/${chapterId}/subChapters`;
  },
  communityListRoute:(clusterId,chapterId,subChapterId,router)=>{
    return `/admin/subChapters/${clusterId}/${chapterId}/${subChapterId}`;
  }
}

export default dashboardRoutes;
