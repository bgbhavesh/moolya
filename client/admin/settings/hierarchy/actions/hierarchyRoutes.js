

const hierarchyRoutes={
  chapterListRoute:(clusterId)=>{
    return `/admin/settings/hierarchy/clusterhierarchy/${clusterId}/chapters`;
  },
  hierarchyDetails:(clusterId)=>{
    return `/admin/settings/hierarchy/clusterhierarchy/${clusterId}/hierarchyDetails`;
  },
}

export default hierarchyRoutes;
