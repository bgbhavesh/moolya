
const chapterRoutes = {

  subChapterListRoute: (clusterId, chapterId, router) => `/admin/chapters/${clusterId}/${chapterId}/subChapters`,
  subChapterDetails: (clusterId, chapterId, subChapterId, subChapterName, route) => `/admin/chapters/${clusterId}/${chapterId}/${subChapterId}/${subChapterName}/subChapterDetails`,
  createSubChapterDetails: (clusterId, chapterId, route) => `/admin/chapters/${clusterId}/${chapterId}/createSubChapter`,
  communityDetailsRoute: (clusterId, chapterId, subChapterId, communityId, router) => `/admin/chapters/${clusterId}/${chapterId}/${subChapterId}/communities/${communityId}`
}

export default chapterRoutes;
