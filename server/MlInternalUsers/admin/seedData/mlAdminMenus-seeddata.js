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
            "link" : "/admin/cluster/clusterDetails",
            "name" : "clusterDetails",
            "uniqueId" : "clusterDetails",
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
            "link" : "/admin/settings/backendUserList",
            "name" : "Backend Users",
            "uniqueId" : "settings_BackendUsers",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addBackendUser",
              "name": "Add BackendUser",
              "uniqueId": "settings_AddBackendUser",
              "subMenuMappingId":"settings_BackendUsers",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/backendUserList",
                "name": "List BackendUser",
                "uniqueId": "settings_BackendUserList",
                "subMenuMappingId":"settings_BackendUsers",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editBackendUser",
                "name": "Edit BackendUser",
                "uniqueId": "settings_EditBackendUser",
                "subMenuMappingId":"settings_BackendUsers",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
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
                "uniqueId": "settings_EditCountry",
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
            "uniqueId" : "settings_States",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/statesList",
              "name": "List States",
              "uniqueId": "settings_StatesList",
              "subMenuMappingId":"settings_States",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
            {
              "link": "/admin/settings/editState",
              "name": "Edit State",
              "uniqueId": "settings_EditState",
              "subMenuMappingId":"settings_States",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": true,
              "image": ""
            }]
          },
          {
            "link" : "/admin/settings/citiesList",
            "name" : "Cities",
            "uniqueId" : "settings_Cities",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/citiesList",
              "name": "List Cities",
              "uniqueId": "settings_CitiesList",
              "subMenuMappingId":"settings_Cities",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/editCity",
                "name": "Edit City",
                "uniqueId": "settings_EditCity",
                "subMenuMappingId":"settings_Cities",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
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
            "link" : "/admin/settings/transactionTypeList",
            "name" : "Transaction Types",
            "uniqueId" : "settings_transactionTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addTransactionType",
              "name": "Add TransactionType",
              "uniqueId": "settings_AddTransactionType",
              "subMenuMappingId":"settings_transactionTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/transactionTypeList",
                "name": "List TransactionType",
                "uniqueId": "settings_TransactionTypeList",
                "subMenuMappingId":"settings_transactionTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editTransactionType",
                "name": "Edit TransactionType",
                "uniqueId": "settings_EditTransactionType",
                "subMenuMappingId":"settings_transactionTypes",
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
          },
          {
            "link" : "/admin/settings/templateTypeList",
            "name" : "Template Types",
            "uniqueId" : "settings_templateTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addTemplateType",
              "name": "Add TemplateType",
              "uniqueId": "settings_AddTemplateType",
              "subMenuMappingId":"settings_templateTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/templateTypeList",
                "name": "List TemplateType",
                "uniqueId": "settings_TemplateTypeList",
                "subMenuMappingId":"settings_templateTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editTemplateType",
                "name": "Edit TemplateType",
                "uniqueId": "settings_EditTemplateType",
                "subMenuMappingId":"settings_templateTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/documentTypeList",
            "name" : "Document Types",
            "uniqueId" : "settings_documentTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addDocumentType",
              "name": "Add Document Type",
              "uniqueId": "settings_AddDocumentType",
              "subMenuMappingId":"settings_documentTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/templateTypeList",
                "name": "List Document Type",
                "uniqueId": "settings_DocumentTypeList",
                "subMenuMappingId":"settings_documentTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editDocumentType",
                "name": "Edit Document Type",
                "uniqueId": "settings_EditDocumentType",
                "subMenuMappingId":"settings_documentTypes",
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
