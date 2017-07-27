export default function dynamicLinkHandler(path,params,queryParams){
  const menuLinkHandlerConfig={
    "editCluster":function(params,queryParams){
      return '/admin/cluster/'+params.cluserId;
    },
    "dashboard_chapters":function(params,queryParams){
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")&&_.has(dynamicParams,"chapterId")){
        return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters?viewMode=${queryParams.viewMode}`; // View Mode added
      }else if(_.has(dynamicParams,"clusterId")){
        return `/admin/dashboard/${dynamicParams.clusterId}/chapters?viewMode=${queryParams.viewMode}`;  // View Mode added
      }else{
        return '/admin/dashboard/chapters';
      }
      return '';
    },

    "dashboard_communities":function(params,queryParams){
        let dynamicParams=params||{};
        let otherParams = FlowRouter.current().params;
        let otherQueryParams = FlowRouter.current().queryParams;
        let viewMode = otherQueryParams.viewMode?otherQueryParams.viewMode:true
      if(_.has(dynamicParams,"clusterId")&&_.has(dynamicParams,"chapterId")&&_.has(dynamicParams,"subChapterId")){
        return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities`;
      }
      else if(_.has(otherParams,"clusterId")&&_.has(otherParams,"chapterId")){
        return `/admin/dashboard/${otherParams.clusterId}/${otherParams.chapterId}/communities?viewMode=${viewMode}`;
      }
      else if(_.has(otherParams,"clusterId")){
        return `/admin/dashboard/${otherParams.clusterId}/communities?viewMode=${viewMode}`;
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
        return `/admin/settings/hierarchy/clusterhierarchy/${dynamicParams.clusterId}/chapters`;
      }
    },

/*    "hierarchy_details":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/settings/hierarchy/${dynamicParams.clusterId}/hierarchydetails`;
      }
    },*/

    "hierarchy_details":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/settings/hierarchy/clusterhierarchy/${dynamicParams.clusterId}/hierarchyDetails`;
      }
    },
    "cluster_history":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/clusters/${dynamicParams.clusterId}/history`;
      }
    },
    "chapter_history":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"subChapterId")){
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/history`;
      }
    },
    "community_Histroy_Details":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"communityId")){
        return `/admin/community/${dynamicParams.communityId}/history`;
      }
    },
    /**
     * users dynamic routes handler
     * */

    "users_about": function (params, queryParams) {
      let dynamicParams = params || {};
      if (_.has(dynamicParams, "registrationId")) {
        return `/admin/users/${dynamicParams.registrationId}/aboutuser`;
      }
    },
    "users_addressBook": function (params, queryParams) {
      let dynamicParams = params || {};
      if (_.has(dynamicParams, "registrationId")) {
        return `/admin/users/${dynamicParams.registrationId}/addressBook`;
      }
    },
    "users_connections": function (params, queryParams) {
      let dynamicParams = params || {};
      if (_.has(dynamicParams, "registrationId")) {
        return `/admin/users/${dynamicParams.registrationId}/connections/ideator`;
      }
    },
    "users_favourites": function (params, queryParams) {
      let dynamicParams = params || {};
      if (_.has(dynamicParams, "registrationId")) {
        return `/admin/users/${dynamicParams.registrationId}/favourites/ideator`;
      }
    },
    "users_wishlist": function (params, queryParams) {
      let dynamicParams = params || {};
      if (_.has(dynamicParams, "registrationId")) {
        return `/admin/users/${dynamicParams.registrationId}/wishlist/ideator`;
      }
    },
    "users_transactions": function (params, queryParams) {
      let dynamicParams = params || {};
      if (_.has(dynamicParams, "registrationId")) {
        return `/admin/users/${dynamicParams.registrationId}/transactions`;
      }
    },
  }
  let menuLinkHandler=menuLinkHandlerConfig[path];
  if(menuLinkHandler){
    let link=menuLinkHandler(params,queryParams);
    return link;
  }
  return "";
}
