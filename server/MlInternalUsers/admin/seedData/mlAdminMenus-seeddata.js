if(Meteor.isServer){
  MlMenus.upsert({name:"mlAdminMenu"},{$set:{
    "name" : "mlAdminMenu",
    "menu" : [
      {
        "image" : "/images/db_icon.png",
        "link" : "/admin/dashboard",
        "name" : "dashboard",
        "id" : "dashboard",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/dashboard/clusters",
            "name" : "Clusters",
            "id" : "dashboard_clusters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "name" : "cluster_Details",
                "link":"",
                "id" : "dashboard_clusterDetails",
                "isMenu" : true,
                "image" : ""
              },
              {
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "name" : "chapter Details",
                "link":"",
                "id" : "dashboard_chapterDetails",
                "isMenu" : true,
                "image" : ""
              }
            ]
          },
          {
            "link" : "/admin/dashboard/chapter",
            "name" : "Chapters",
            "id" : "dashboard_chapters",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/dashboard/communities",
            "name" : "Communities",
            "id" : "dashboard_communities",
            "isLink" : true,
            "image" : ""
          },

        ]
      },
      {
        "image" : "/images/cluster_icon.png",
        "link" : "/admin/cluster",
        "name" : "cluster",
        "id"   :"cluster",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/cluster/addCluster",
            "name" : "Clusters",
            "id" : "cluster_clusters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
          },
          {
            "link" : "/admin/cluster/chapter",
            "name" : "Chapters",
            "id" : "cluster_chapters",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/cluster/communities",
            "name" : "Communities",
            "id" : "cluster_communities",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/cluster/internal_users",
            "name" : "Internal Users",
            "id" : "cluster_Internal_Users",
            "isLink" : true,
            "image" : ""
          },

        ]
      },
      {
        "image" : "/images/chapter_icon.png",
        "link" : "/admin/chapter",
        "id" : "chapter",
        "name" : "chapter",
        "isLink" : "true",
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/chapter/chapters",
            "name" : "Chapters",
            "id" : "chapter_chapters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
          },
        ]
      },
      {
        "image" : "/images/community_icon.png",
        "link" : "/admin/community",
        "id" : "community",
        "name" : "community",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admichapters/comminty/communities",
            "name" : "communities",
            "id" : "community_communities",
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
        "id" : "settings",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/settings/departmentsList",
            "name" : "Departments",
            "id" : "settings_departments",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/subDepartmentsList",
            "name" : "Sub Departments",
            "id" : "settings_subDepartments",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/permissionList",
            "name" : "Permission",
            "id" : "settings_permission",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/rolesList",
            "name" : "Roles",
            "id" : "settings_roles",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/internalUsersList",
            "name" : "Internal Users",
            "id" : "settings_internalUsers",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/requestTypesList",
            "name" : "Request Types",
            "id" : "settings_requestTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/filtersList",
            "name" : "Filters",
            "id" : "settings_filters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/countriesList",
            "name" : "Countries",
            "id" : "settings_countries",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/statesList",
            "name" : "States",
            "id" : "settings_states",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
          {
            "link" : "/admin/settings/citiesList",
            "name" : "Cities",
            "id" : "settings_cities",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/settings/departmentsList",
                "name" : "Departments",
                "id" : "settings_departments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/subDepartmentsList",
                "name" : "Sub Departments",
                "id" : "settings_subDepartments",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/permissionList",
                "name" : "Permission",
                "id" : "settings_permission",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/rolesList",
                "name" : "Roles",
                "id" : "settings_roles",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/internalUsersList",
                "name" : "Internal Users",
                "id" : "settings_internalUsers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/requestTypesList",
                "name" : "Request Types",
                "id" : "settings_requestTypes",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/filtersList",
                "name" : "Filters",
                "id" : "settings_filters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/countriesList",
                "name" : "Countries",
                "id" : "settings_countries",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/statesList",
                "name" : "States",
                "id" : "settings_states",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
              {
                "link" : "/admin/settings/citiesList",
                "name" : "Cities",
                "id" : "settings_cities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
              },
            ]
          },
        ]
      }
    ]
  }});
}
