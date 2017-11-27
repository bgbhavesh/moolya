
const communityRoutes = {
  communityListRoute: (id, router) => `/admin/community/${id}/communityDetails`,

  subChaptercommunityDetailsRoute: (clusterId, chapterId, subChapterId, id, router) => `/admin/communities/${clusterId}/${chapterId}/subChapters/${subChapterId}/${id}/communityDetails`,

  subChapterListRoute: (clusterId, chapterId, router) => `/admin/communities/chapters/${clusterId}/${chapterId}/subChapters`,

  subChapterCommunityListRoute: (clusterId, chapterId, subChapterId, router) => `/admin/communities/${clusterId}/${chapterId}/subChapters/${subChapterId}/communities`
}
export default communityRoutes;
