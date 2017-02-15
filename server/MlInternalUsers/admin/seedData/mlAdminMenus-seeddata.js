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
            "uniqueId" : "settings_Departments",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addDepartment",
                "name": "Add Departments",
                "uniqueId": "settings_AddDepartment",
                "subMenuMappingId":"settings_Departments",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/departmentsList",
                "name": "List Department",
                "uniqueId": "settings_DepartmentList",
                "subMenuMappingId":"settings_Departments",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editDepartment",
                "name": "Edit Department",
                "uniqueId": "settings_EditDepartment",
                "subMenuMappingId":"settings_Departments",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/settings/subDepartmentsList",
            "name" : "Sub Departments",
            "uniqueId" : "settings_SubDepartments",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addSubDepartment",
              "name": "Add Sub Departments",
              "uniqueId": "settings_AddSubDepartments",
              "subMenuMappingId":"settings_SubDepartments",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
              },
              {
                "link": "/admin/settings/subDepartmentsList",
                "name": "List Sub Department",
                "uniqueId": "settings_SubDepartmentList",
                "subMenuMappingId":"settings_SubDepartments",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editSubDepartment",
                "name": "Edit Sub Department",
                "uniqueId": "settings_EditSubDepartments",
                "subMenuMappingId":"settings_SubDepartments",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/permissionList",
            "name" : "Permission",
            "uniqueId" : "settings_Permissions",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addPermission",
              "name": "Add Permission",
              "uniqueId": "settings_AddPermissions",
              "subMenuMappingId":"settings_Permissions",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/permissionList",
                "name": "List Permissions",
                "uniqueId": "settings_PermissionList",
                "subMenuMappingId":"settings_Permissions",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editPermission",
                "name": "Edit Permission",
                "uniqueId": "settings_EditPermissions",
                "subMenuMappingId":"settings_Permissions",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
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
            "link" : "/admin/settings/requestTypeList",
            "name" : "Request Types",
            "uniqueId" : "settings_requestTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addRequestType",
              "name": "Add RequestType",
              "uniqueId": "settings_AddRequestType",
              "subMenuMappingId":"settings_requestTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/requestTypeList",
                "name": "List RequestType",
                "uniqueId": "settings_RequestTypeList",
                "subMenuMappingId":"settings_requestTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editRequestType",
                "name": "Edit RequestType",
                "uniqueId": "settings_EditRequestType",
                "subMenuMappingId":"settings_requestTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]

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
            "uniqueId" : "settings_Countries",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
                "link": "/admin/settings/countriesList",
                "name": "List Countries",
                "uniqueId": "settings_CountriesList",
                "subMenuMappingId":"settings_Countries",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editCountry",
                "name": "Edit Countries",
                "uniqueId": "settings_EditCountries",
                "subMenuMappingId":"settings_Countries",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
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
          },
          {
            "link" : "/admin/settings/userTypeList",
            "name" : "User Types",
            "uniqueId" : "settings_userTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[
              {
                "link": "/admin/settings/userTypeList",
                "name": "List UserType",
                "uniqueId": "settings_UserTypeList",
                "subMenuMappingId":"settings_userTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editUserType",
                "name": "Edit UserType",
                "uniqueId": "settings_EditUserType",
                "subMenuMappingId":"settings_userTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]

          },
          {
            "link" : "/admin/settings/roleTypeList",
            "name" : "Role Types",
            "uniqueId" : "settings_roleTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[
              {
                "link": "/admin/settings/roleTypeList",
                "name": "List RoleType",
                "uniqueId": "settings_RoleTypeList",
                "subMenuMappingId":"settings_roleTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editRoleType",
                "name": "Edit RoleType",
                "uniqueId": "settings_EditRoleType",
                "subMenuMappingId":"settings_roleTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]

          }
        ]
      }
    ]
  }});
}
