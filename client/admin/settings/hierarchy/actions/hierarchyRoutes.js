

const hierarchyRoutes={
  chapterListRoute:(clusterId)=>{
    return `/admin/settings/hierarchy/${clusterId}/chapters`;
  },
  hierarchyDetails:(clusterId)=>{
    return `/admin/settings/hierarchy/${clusterId}/hierarchyDetails`;
  },
}

export default hierarchyRoutes;
