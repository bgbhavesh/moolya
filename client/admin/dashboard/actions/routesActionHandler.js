
const dashboardRoutes = {
  clusterDetailsRoute: (clusterId, route)=> {
    return `/admin/cluster/clusterDetails/${clusterId}`;
  },
  chapterListRoute: (clusterId, v, route)=> {
    return `/admin/dashboard/${clusterId}/chapters?viewMode=${v}`;
  },
  subChapterListRoute: (clusterId, chapterId, v, router) => {
    return `/admin/dashboard/${clusterId}/${chapterId}/subChapters?viewMode=${v}`;
  },
  subChapterAnchorRoute: (clusterId, chapterId, subChapterId, v, router)=> {
    return `/admin/dashboard/${clusterId}/${chapterId}/${subChapterId}/anchorInfoView?viewMode=${v}`;
  },
  communityListRoute: (clusterId, chapterId, subChapterId, v, router)=> {
    return `/admin/dashboard/${clusterId}/${chapterId}/${subChapterId}/communities?viewMode=${v}`;
  },
  backendUserDetailRoute:(clusterId, chapterId, subChapterId, backendUserId, route)=> {
    if(clusterId!="" && chapterId!="" && subChapterId!=""){
      return `/admin/dashboard/${clusterId}/${chapterId}/${subChapterId}/communities/${backendUserId}/backendUserDetails`;
    }
    else if(clusterId!="" && chapterId!=""){
      return `/admin/dashboard/${clusterId}/${chapterId}/communities/${backendUserId}/backendUserDetails`;
    }
    else if(clusterId!=""){
      return `/admin/dashboard/${clusterId}/communities/${backendUserId}/backendUserDetails`;
    }
    else{
      return `/admin/dashboard/communities/${backendUserId}/backendUserDetails`;
    }
  },
}

export default dashboardRoutes;
