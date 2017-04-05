export default function dynamicLinkHandler(path,params,queryParams){
  const menuLinkHandlerConfig={
    "editCluster":function(params,queryParams){
      return '/admin/cluster/'+params.cluserId;
    },
    "dashboard_chapters":function(params,queryParams){
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")&&_.has(dynamicParams,"chapterId")){
        return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters`;
      }else if(_.has(dynamicParams,"clusterId")){
        return `/admin/dashboard/${dynamicParams.clusterId}/chapters`;
      }else{
        return '/admin/dashboard/chapters';
      }
      return '';
    },

    "dashboard_communities":function(params,queryParams){
        let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")&&_.has(dynamicParams,"chapterId")&&_.has(dynamicParams,"subChapterId")){
        return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities`;
      }
      else{
        return '/admin/dashboard/communities';
      }
      return '';
    },

    "cluster_clusterDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/clusterDetails`;
      }
    },
    "cluster_chapters":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/chapters`;
      }
    },
    "cluster_chapter_subChapterDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/subChapterDetails`;
      }
    },
    "cluster_chapter_communities_communityDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}`;
      }
    },
    "cluster_chapter_communities_assignusers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}/assignusers`;
      }
    },
    "cluster_chapter_communities":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/communities`;
      }
    },
    "cluster_chapter_assignusers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/assignusers`;
      }
    },

    "cluster_communities":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/communities`;
      }
    },
    "cluster_communities_communityDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/communities/${dynamicParams.communityId}`;
      }
    },
    "cluster_communities_assignusers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/communities/${dynamicParams.communityId}/assignusers`;
      }
    },
    "cluster_assignusers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/assignusers`;
      }
    },

    "chapter_subChapterDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"subChapterId")){
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/subChapterDetails`;
      }
    },

    "chapter_communities":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"subChapterId")){
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/communities`;
      }
    },
    "chapter_communities_communityDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"subChapterId")){
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}`;
      }
    },
    "chapter_communities_assignusers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"subChapterId")){
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}/assignusers`;
      }
    },

    "chapter_assignusers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"subChapterId")){
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/assignusers`;
      }
    },

    "communities_subChapters_communityDetails":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"communityId")){
        return `/admin/communities/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters/${dynamicParams.subChapterId}/${dynamicParams.communityId}/communityDetails`;
      }
    },

    "communities_subChapters_assignUsers":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"communityId")){
        return `/admin/communities/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters/${dynamicParams.subChapterId}/${dynamicParams.communityId}/assignusers`;
      }
    },

    "hierarchy_chapters":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/settings/hierarchy/${dynamicParams.clusterId}/chapters`;
      }
    },

    "hierarchy_details":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/settings/hierarchy/${dynamicParams.clusterId}/hierarchydetails`;
      }
    },

    "hierarchy_cluster":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/settings/hierarchy/${dynamicParams.clusterId}/clusterhierarchy`;
      }
    }
  }
  let menuLinkHandler=menuLinkHandlerConfig[path];
  if(menuLinkHandler){
    let link=menuLinkHandler(params,queryParams);
    return link;
  }
  return "";
}
