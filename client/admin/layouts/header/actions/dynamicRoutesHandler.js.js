export default function dynamicLinkHandler(path, params, queryParams) {
  const menuLinkHandlerConfig = {
    editCluster(params, queryParams) {
      return `/admin/cluster/${params.cluserId}`;
    },
    dashboard_chapters(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId') && _.has(dynamicParams, 'chapterId')) {
        return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters?viewMode=${queryParams.viewMode}`; // View Mode added
      } else if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/dashboard/${dynamicParams.clusterId}/chapters?viewMode=${queryParams.viewMode}`; // View Mode added
      }
      return '/admin/dashboard/chapters';

      return '';
    },

    dashboard_communities(params, queryParams) {
      const dynamicParams = params || {};
      const otherParams = FlowRouter.current().params;
      const otherQueryParams = FlowRouter.current().queryParams;
      const viewMode = otherQueryParams.viewMode ? otherQueryParams.viewMode : true
      if (_.has(dynamicParams, 'clusterId') && _.has(dynamicParams, 'chapterId') && _.has(dynamicParams, 'subChapterId')) {
        return `/admin/dashboard/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities`;
      } else if (_.has(otherParams, 'clusterId') && _.has(otherParams, 'chapterId')) {
        return `/admin/dashboard/${otherParams.clusterId}/${otherParams.chapterId}/communities?viewMode=${viewMode}`;
      } else if (_.has(otherParams, 'clusterId')) {
        return `/admin/dashboard/${otherParams.clusterId}/communities?viewMode=${viewMode}`;
      }
      return '/admin/dashboard/communities';

      return '';
    },

    cluster_clusterDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/clusterDetails`;
      }
    },
    cluster_chapters(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/chapters`;
      }
    },
    cluster_chapter_subChapterDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/subChapterDetails`;
      }
    },
    cluster_chapter_anchorDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/anchorDetails`;
      }
    },
    cluster_chapter_communities_communityDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}`;
      }
    },
    cluster_chapter_communities_assignusers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}/assignusers`;
      }
    },
    cluster_chapter_communities(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/communities`;
      }
    },
    cluster_chapter_assignusers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/assignusers`;
      }
    },

    cluster_communities(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/communities`;
      }
    },
    cluster_communities_communityDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/communities/${dynamicParams.communityId}`;
      }
    },
    cluster_communities_assignusers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/communities/${dynamicParams.communityId}/assignusers`;
      }
    },
    cluster_assignusers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/assignusers`;
      }
    },

    chapter_subChapterDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/subChapterDetails`;
      }
    },

    chapter_anchorDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/anchorDetails`;
      }
    },

    chapter_communities(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/communities`;
      }
    },
    chapter_communities_communityDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}`;
      }
    },
    chapter_communities_assignusers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/communities/${dynamicParams.communityId}/assignusers`;
      }
    },

    chapter_assignusers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/assignusers`;
      }
    },

    communities_subChapters_communityDetails(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'communityId')) {
        return `/admin/communities/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters/${dynamicParams.subChapterId}/${dynamicParams.communityId}/communityDetails`;
      }
    },

    communities_subChapters_assignUsers(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'communityId')) {
        return `/admin/communities/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters/${dynamicParams.subChapterId}/${dynamicParams.communityId}/assignusers`;
      }
    },

    hierarchy_chapters(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/settings/hierarchy/clusterhierarchy/${dynamicParams.clusterId}/chapters`;
      }
    },

    /*    "hierarchy_details":function (params,queryParams) {
      let dynamicParams=params||{};
      if(_.has(dynamicParams,"clusterId")){
        return `/admin/settings/hierarchy/${dynamicParams.clusterId}/hierarchydetails`;
      }
    }, */

    hierarchy_details(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/settings/hierarchy/clusterhierarchy/${dynamicParams.clusterId}/hierarchyDetails`;
      }
    },
    cluster_history(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'clusterId')) {
        return `/admin/clusters/${dynamicParams.clusterId}/history`;
      }
    },
    chapter_history(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'subChapterId')) {
        return `/admin/chapters/${dynamicParams.clusterId}/${dynamicParams.chapterId}/${dynamicParams.subChapterId}/${dynamicParams.subChapterName}/history`;
      }
    },
    community_History_Details(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'communityId')) {
        return `/admin/community/${dynamicParams.communityId}/history`;
      }
    },
    community_subChapter_History_Details(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'communityId')) {
        return `/admin/communities/${dynamicParams.clusterId}/${dynamicParams.chapterId}/subChapters/${dynamicParams.subChapterId}/${dynamicParams.communityId}/history`;
      }
    },
    community_Community_Details(params, queryParams) { // fix for Issue: MOOLYA-3389
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'communityId')) {
        return `/admin/community/${dynamicParams.communityId}/communityDetails`;
      }
    },

    /**
     * users dynamic routes handler
     * */
    users_about(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/aboutuser`;
      }
    },
    users_addressBook(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/addressBook`;
      }
    },
    users_portfolio(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/portfolio`;
      }
    },
    users_connections(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/connections`;
      }
    },
    users_favourites(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/favourites`;
      }
    },
    users_library(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/view/library`;
      }
    },
    users_transactions(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/transactions`;
      }
    },
    users_History(params, queryParams) {
      const dynamicParams = params || {};
      if (_.has(dynamicParams, 'registrationId') && _.has(dynamicParams, 'portfolioId')) {
        return `/admin/users/${dynamicParams.registrationId}/${dynamicParams.portfolioId}/history`;
      }
    }
  }
  const menuLinkHandler = menuLinkHandlerConfig[path];
  if (menuLinkHandler) {
    const link = menuLinkHandler(params, queryParams);
    return link;
  }
  return '';
}
