
const dashboardRoutes = {
  chapterListRoute: (clusterId, v, route) => `/app/dashboard/${clusterId}/chapters?viewMode=${v}`,
  subChapterListRoute: (clusterId, chapterId, v, router) => `/app/dashboard/${clusterId}/${chapterId}/subChapters?viewMode=${v}`,
  communityListRoute: (clusterId, chapterId, subChapterId, v, router) => `/app/dashboard/${clusterId}/${chapterId}/${subChapterId}/communities?viewMode=${v}`,
  subChapterAnchorRoute: (clusterId, chapterId, subChapterId, v, router) => `/app/dashboard/${clusterId}/${chapterId}/${subChapterId}/anchorInfoView?viewMode=${v}`,
  userListRoute: (clusterId, chapterId, subChapterId, portfolioId, communityType, router) => `/app/dashboard/${clusterId}/${chapterId}/${subChapterId}/${communityType}/${portfolioId}`
}

export default dashboardRoutes;
