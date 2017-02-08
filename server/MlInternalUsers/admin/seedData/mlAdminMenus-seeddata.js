if(Meteor.isServer){
  MlMenus.upsert({name:"mlAdminMenu"},{$set:{
    "name" : "mlAdminMenu",
    "menu" : [
      {
        "image" : "/images/db_icon.png",
        "link" : "/admin/dashboard",
        "name" : "dashboard",
        "uniqueId" : "dashboard",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/dashboard/clusters",
            "name" : "Clusters",
            "uniqueId" : "dashboard_clusters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "name" : "cluster_Details",
                "link":"",
                "uniqueId" : "dashboard_clusterDetails",
                "isMenu" : true,
                "image" : ""
              },
              {
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "name" : "chapter Details",
                "link":"",
                "uniqueId" : "dashboard_chapterDetails",
                "isMenu" : true,
                "image" : ""
              }
            ]
          },
          {
            "link" : "/admin/dashboard/chapter",
            "name" : "Chapters",
            "uniqueId" : "dashboard_chapters",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/dashboard/communities",
            "name" : "Communities",
            "uniqueId" : "dashboard_communities",
            "isLink" : true,
            "image" : ""
          },

        ]
      },
      {
        "image" : "/images/cluster_icon.png",
        "link" : "/admin/cluster",
        "name" : "cluster",
        "uniqueId"   :"cluster",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/cluster/addCluster",
            "name" : "Clusters",
            "uniqueId" : "cluster_clusters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
          },
          {
            "link" : "/admin/cluster/chapter",
            "name" : "Chapters",
            "uniqueId" : "cluster_chapters",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/cluster/communities",
            "name" : "Communities",
            "uniqueId" : "cluster_communities",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/cluster/internal_users",
            "name" : "Internal Users",
            "uniqueId" : "cluster_Internal_Users",
            "isLink" : true,
            "image" : ""
          },

        ]
      },
      {
        "image" : "/images/chapter_icon.png",
        "link" : "/admin/chapter",
        "uniqueId" : "chapter",
        "name" : "chapter",
        "isLink" : "true",
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/chapter/chapters",
            "name" : "Chapters",
            "uniqueId" : "chapter_chapters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
          },
        ]
      },
      {
        "image" : "/images/community_icon.png",
        "link" : "/admin/community",
        "uniqueId" : "community",
        "name" : "community",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admichapters/comminty/communities",
            "name" : "communities",
            "uniqueId" : "community_communities",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
          },
        ]
      },
      {
        "image" : "/images/documents_icon.png",
        "link" : "/admin/documents",
        "name" : "documents",
        "isLink" : true,
        "isMenu" : true
      },
      {
        "image" : "/images/services_icon.png",
        "link" : "/admin/services",
        "name" : "services",
        "isLink" : true,
        "isMenu" : true
      },
      {
        "image" : "/images/settings_icon.png",
        "link" : "/admin/settings/departmentsList",
        "name" : "settings",
        "uniqueId" : "settings",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/settings/departmentsList",
            "name" : "Departments",
            "uniqueId" : "settings_departments",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/subDepartmentsList",
            "name" : "Sub Departments",
            "uniqueId" : "settings_subDepartments",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/permissionList",
            "name" : "Permission",
            "uniqueId" : "settings_permission",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/rolesList",
            "name" : "Roles",
            "uniqueId" : "settings_roles",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/internalUsersList",
            "name" : "Internal Users",
            "uniqueId" : "settings_internalUsers",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/requestTypesList",
            "name" : "Request Types",
            "uniqueId" : "settings_requestTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/filtersList",
            "name" : "Filters",
            "uniqueId" : "settings_filters",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/countriesList",
            "name" : "Countries",
            "uniqueId" : "settings_countries",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/statesList",
            "name" : "States",
            "uniqueId" : "settings_states",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/settings/citiesList",
            "name" : "Cities",
            "uniqueId" : "settings_cities",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          }
        ]
      }
    ]
  }});
}
