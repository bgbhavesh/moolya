
const dashboardRoutes={
  clusterDetailsRoute:(clusterId, route)=> {
    return `/admin/cluster/clusterDetails/${clusterId}`;
  },
  chapterListRoute:(clusterId)=>{
    return `/admin/chapters/${clusterId}`;
  },
  subChapterListRoute:(clusterId,chapterId,router) =>{
  return `/admin/chapters/${clusterId}/${chapterId}`;
  },
  communityListRoute:(clusterId,chapterId,subChapterId,router)=>{
    return `/admin/subChapters/${clusterId}/${chapterId}/${subChapterId}`;
  }
}

export default dashboardRoutes;
