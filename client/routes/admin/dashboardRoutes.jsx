import {adminSection} from "../admin/adminRoutes";
import React from "react";
import {render} from "react-dom";
import {mount} from "react-mounter";
import AdminLayout from "../../admin/layouts/AdminLayout";
import {
  mlChapterDashboardMapConfig,
  mlChapterDashboardListConfig
} from "../../admin/dashboard/config/mlChapterDashboardConfig";
import {
  mlClusterDashboardListConfig,
  mlClusterDashboardMapConfig
} from "../../admin/dashboard/config/mlClusterDashboardConfig";
import {
  mlSubChapterDashboardMapConfig,
  mlSubChapterDashboardListConfig
} from "../../admin/dashboard/config/mlSubChapterDashboardConfig";
import {
  mlCommunityDashboardListConfig,
  mlCommunityDashboardMapConfig
} from "../../admin/dashboard/config/mlCommunityDashboardConfig";
import MlViews from "../../admin/core/components/MlViews";
import MlAdminHeader from "../../admin/layouts/header/MlAdminHeader";
import {getAdminUserContext} from "../../commons/getAdminUserContext";
import MlEditBackendUser from '../../admin/settings/backendUsers/component/MlEditBackendUser'
import MlAnchorInfoView from '../../admin/subChapter/components/anchor/MlAnchorInfoView'

adminSection.route('/dashboard', {
  triggersEnter: [function (context, redirect) {
    const userDefaultObj = getAdminUserContext();
    if (userDefaultObj.hierarchyCode == 'PLATFORM')
      redirect('/admin/dashboard/clusters');
    else
      redirect('/admin/dashboard/chapters');
  }]

});

adminSection.route('/dashboard/clusters', {
  name: 'dashboard_clusters',
  action(){
    mount(AdminLayout, {
      adminContent: <MlViews showInfinity={true} mapConfig={mlClusterDashboardMapConfig}
                             listConfig={mlClusterDashboardListConfig}/>
    })
  }
});

adminSection.route('/dashboard/chapters', {
  name: 'dashboard_chapters',
  action(){
    mount(AdminLayout, {headerContent:<MlAdminHeader breadcrum={{type:'hierarchy','showBreadCrum':true,'module':'chapter'}} />,
      adminContent: <MlViews showInfinity={true} mapConfig={mlChapterDashboardMapConfig}
                             listConfig={mlChapterDashboardListConfig}/>
    })
  }
});

adminSection.route('/dashboard/communities', {
  name: 'dashboard_communities',
  action(){
    mount(AdminLayout, {
      adminContent: <MlViews showInfinity={true} mapConfig={mlCommunityDashboardMapConfig}
                             listConfig={mlCommunityDashboardListConfig}/>
    })
  }
});

adminSection.route('/dashboard/:clusterId/chapters', {
  name: 'dashboard_specChapters', action(params, queryParams){
    let viewMode;
    if (queryParams.viewMode == "false") {
      viewMode = false;
    } else if (queryParams.viewMode == "true") {
      viewMode = true
    }
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'dashboard'}}/>,
      adminContent: <MlViews viewMode={viewMode} showInfinity={true} mapConfig={mlChapterDashboardMapConfig}
                             listConfig={mlChapterDashboardListConfig} params={params}/>
    })
  }
});
adminSection.route('/dashboard/:clusterId/:chapterId/subChapters', {
  name: 'dashboard_specSubChapters',
  action(params, queryParams){
    let viewMode;
    if (queryParams.viewMode == "false") {
      viewMode = false;
    } else if (queryParams.viewMode == "true") {
      viewMode = true
    }
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'dashboard'}}/>,
      adminContent: <MlViews viewMode={viewMode} showInfinity={true} mapConfig={mlSubChapterDashboardMapConfig}
                             listConfig={mlSubChapterDashboardListConfig} params={params}/>
    })
  }
});

adminSection.route('/dashboard/:clusterId/:chapterId/:subChapterId/anchorInfoView', {
  name: 'dashboard_specSubChapters_anchorInfoView',
  action(params, queryParams){
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'dashboard'}}/>,
      adminContent: <MlAnchorInfoView subChapterId={params.subChapterId} clusterId={params.clusterId}
                                      chapterId={params.chapterId} queryParams={queryParams}/>
    })
  }
});


adminSection.route('/dashboard/:clusterId/:chapterId/:subChapterId/communities', {
  name: 'dashboard_communities',
  action(params, queryParams){
    let viewMode;
    if (queryParams.viewMode == "false") {
      viewMode = false;
    } else if (queryParams.viewMode == "true") {
      viewMode = true
    }
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'dashboard'}}/>,
      adminContent: <MlViews viewMode={viewMode} showInfinity={true} mapConfig={mlCommunityDashboardMapConfig}
                             listConfig={mlCommunityDashboardListConfig} params={params}/>
    })
  }
});

adminSection.route('/dashboard/:clusterId/communities', {
  name: 'dashboard_communities',
  action(params, queryParams){
    let viewMode;
    if (queryParams.viewMode == "false") {
      viewMode = false;
    } else if (queryParams.viewMode == "true") {
      viewMode = true
    }
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'dashboard'}}/>,
      adminContent: <MlViews viewMode={viewMode} showInfinity={true} mapConfig={mlCommunityDashboardMapConfig}
                             listConfig={mlCommunityDashboardListConfig} params={params}/>
    })
  }
});

adminSection.route('/dashboard/:clusterId/:chapterId/communities', {
  name: 'dashboard_communities',
  action(params, queryParams){
    let viewMode;
    if (queryParams.viewMode == "false") {
      viewMode = false;
    } else if (queryParams.viewMode == "true") {
      viewMode = true
    }
    mount(AdminLayout, {
      headerContent: <MlAdminHeader breadcrum={{type: 'hierarchy', 'showBreadCrum': true, 'module': 'dashboard'}}/>,
      adminContent: <MlViews viewMode={viewMode} showInfinity={true} mapConfig={mlCommunityDashboardMapConfig}
                             listConfig={mlCommunityDashboardListConfig} params={params}/>
    })
  }
});

adminSection.route('/dashboard/:clusterId/:chapterId/:subChapterId/communities/:backendUserId/backendUserDetails', {
  name: 'dashboard_backendUserDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditBackendUser config={params.backendUserId}/>})
  }
});
adminSection.route('/dashboard/:clusterId/:chapterId/communities/:backendUserId/backendUserDetails', {
  name: 'dashboard_backendUserDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditBackendUser config={params.backendUserId}/>})
  }
});
adminSection.route('/dashboard/:clusterId/communities/:backendUserId/backendUserDetails', {
  name: 'dashboard_backendUserDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditBackendUser config={params.backendUserId}/>})
  }
});
adminSection.route('/dashboard/communities/:backendUserId/backendUserDetails', {
  name: 'dashboard_backendUserDetails',
  action(params){
    mount(AdminLayout,{adminContent:< MlEditBackendUser config={params.backendUserId}/>})
  }
});
