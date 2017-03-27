
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
  communityListRoute: (clusterId, chapterId, subChapterId, v, router)=> {
    return `/admin/dashboard/${clusterId}/${chapterId}/${subChapterId}/communities?viewMode=${v}`;
  }
}

export default dashboardRoutes;
