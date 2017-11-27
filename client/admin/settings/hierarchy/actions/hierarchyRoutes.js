

const hierarchyRoutes = {
  chapterListRoute: clusterId => `/admin/settings/hierarchy/clusterhierarchy/${clusterId}/chapters`,
  hierarchyDetails: (clusterId, subChapterId, isDefaultSubChapter) => `/admin/settings/hierarchy/clusterhierarchy/${clusterId}/${subChapterId}/${isDefaultSubChapter}/hierarchyDetails`
}

export default hierarchyRoutes;
