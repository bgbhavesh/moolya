

const hierarchyRoutes={
  chapterListRoute:(clusterId)=>{
    return `/admin/settings/hierarchy/${clusterId}/chapters`;
  },
  hierarchyDetails:(clusterId)=>{
    return `/admin/settings/hierarchy/${clusterId}/platformhierarchy`;
  },
}

export default hierarchyRoutes;
