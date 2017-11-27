/**
 * Created by venkatasrinag on 21/2/17.
 */

const clusterRoutes = {
  clusterDetailsRoute: (clusterId, route) => `/admin/clusters/${clusterId}/clusterDetails`,

  chapterListRoute: clusterId => `/admin/clusters/${clusterId}/chapters`,
  subChapterListRoute: (clusterId, chapterId, router) => `/admin/clusters/${clusterId}/${chapterId}/subChapters`,
  subChapterDetails: (clusterId, chapterId, subChapterId, subChapterName, route) => `/admin/clusters/${clusterId}/${chapterId}/${subChapterId}/${subChapterName}/subChapterDetails`,
  createSubChapterDetails: (clusterId, chapterId, route) => `/admin/clusters/${clusterId}/${chapterId}/createSubChapter`,
  communityListRoute: (clusterId, chapterId, subChapterId, router) => `/admin/clusters/${clusterId}/${chapterId}/${subChapterId}/communities`,
  communityDetailsRoute: (clusterId, communityId, router) => `/admin/clusters/${clusterId}/communities/${communityId}`,
  chapterCommunityDetailsRoute: (clusterId, chapterId, subChapterId, communityId, router) => `/admin/clusters/${clusterId}/${chapterId}/${subChapterId}/communities/${communityId}`
}

export default clusterRoutes;
