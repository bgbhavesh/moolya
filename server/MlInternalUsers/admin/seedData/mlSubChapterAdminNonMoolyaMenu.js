/**
 * Created by venkatsrinag on 19/5/17.
 */
if (Meteor.isServer) {
  MlMenus.upsert({name: "mlSubChapterAdminNonMoolya"}, {
    $set: {
      "name": "mlSubChapterAdminNonMoolya",
      "menu": [
        {
          "image": "/images/db_icon.png",
          "link": "/admin/dashboard/chapters",
          "name": "Dashboard",
          "uniqueId": "dashboard",
          "isLink": true,
          "isMenu": true,
          "subMenu": [
            {
              "link": "",
              "name": "Clusters",
              "uniqueId": "dashboard_clusters",
              "subMenuMappingId": "dashboard_clusters",
              "subMenusId": "dashboard",
              "isLink": false,
              "isMenu": false,
              "isDisabled": true,
              "image": ""
            },
            {
              "link": "/admin/dashboard/chapters",
              "name": "Chapters",
              "dynamicLink": true,
              "dynamicLinkHandler": "",
              "uniqueId": "dashboard_chapters",
              "subMenuMappingId": "dashboard_chapters",
              "subMenusId": "dashboard",
              "isLink": true,
              "image": "",
              "subMenu": [
                {
                  "link": "/admin/dashboard/clusters",
                  "name": "SpecChapters",
                  "uniqueId": "dashboard_specChapters",
                  "subMenuMappingId": "dashboard_chapters",
                  "subMenusId": "dashboard",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""

                },
                {
                  "link": "/admin/dashboard/clusters",
                  "name": "SpecSubChapters",
                  "uniqueId": "dashboard_specSubChapters",
                  "subMenuMappingId": "dashboard_chapters",
                  "subMenusId": "dashboard",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""

                }]
            },
            {
              "link": "/admin/dashboard/communities",
              "name": "Communities",
              "uniqueId": "dashboard_communities",
              "subMenuMappingId": "dashboard_communities",
              "subMenusId": "dashboard",
              "isLink": true,
              "image": ""
            },
          ]
        },
        {
          "image": "/images/cluster_icon.png",
          "link": "",
          "name": "Cluster",
          "uniqueId": "cluster",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/chapter_icon.png",
          "link": "/admin/chapters",
          "uniqueId": "chapter",
          "name": "chapter",
          "isLink": true,
          "isMenu": true,
          "hideSubMenu": true,
          "subMenu": [
            {
              "link": "/admin/chapters",
              "name": "Chapters",
              "uniqueId": "chapter_chapters",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "dynamicLink": true,
              "hideSubMenu": true,
              "dynamicLinkHandler": "",
              "subMenusId": "chapter",
              "subMenuMappingId": "chapter_chapters",
              "subMenu": [
                {
                  "link": "/admin/chapters/subChapters/subChapterDetails",
                  "name": "SubChapterDetails",
                  "uniqueId": "chapter_subChapterDetails",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "chapter_chapters",
                  "subMenuMappingId": "chapter_subChapterDetails"
                },
                {
                  "link": "/admin/chapters/subChapters/communities",
                  "name": "Communities",
                  "uniqueId": "chapter_communities",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "chapter_chapters",
                  "subMenuMappingId": "chapter_communities",
                  "subMenu": [
                    {
                      "link": "/admin/chapters/subChapters/communities/communityDetails",
                      "name": "Community Details",
                      "uniqueId": "chapter_communities_communityDetails",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "chapter_communities",
                      "subMenuMappingId": "chapter_communities_communityDetails"
                    },
                    {
                      "link": "/admin/chapters/subChapters/communities/assignusers",
                      "name": "Backend Users",
                      "uniqueId": "chapter_communities_assignusers",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "chapter_communities",
                      "subMenuMappingId": "chapter_communities_assignusers"
                    },
                  ]
                },
                {
                  "link": "/admin/chapters/assignusers",
                  "name": "Backend Users",
                  "uniqueId": "chapter_assignusers",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "chapter_chapters",
                  "subMenuMappingId": "chapter_assignusers"
                }
              ]
            }
          ]
        },
        {
          "image": "/images/community_icon.png",
          "link": "/admin/communities",
          "uniqueId": "community",
          "name": "community",
          "isLink": true,
          "isMenu": true,
          "hideSubMenu": true,
          "subMenu": [
            {
              "link": "/admin/community/chapter",
              "name": "Chapter",
              "uniqueId": "communities_chapters",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "dynamicLink": true,
              "dynamicLinkHandler": "",
              "subMenusId": "community",
              "hideSubMenu": true,
              "subMenuMappingId": "communities_chapters",
              "subMenu": [
                {
                  "link": "/admin/community/chapter/subChapter",
                  "name": "Sub Chapter",
                  "uniqueId": "communities_subChapters",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "dynamicLink": true,
                  "dynamicLinkHandler": "",
                  "subMenusId": "communities_chapters",
                  "hideSubMenu": true,
                  "subMenuMappingId": "communities_subChapters",
                  "subMenu": [
                    {
                      "link": "/admin/community/subChapter/community/communityDetails",
                      "name": "Community Details",
                      "uniqueId": "communities_subChapters_communityDetails",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "communities_subChapters",
                      "subMenuMappingId": "communities_subChapters_communityDetails",
                    },
                    {
                      "link": "/admin/community/subChapter/community/assignuser",
                      "name": "Backend User",
                      "uniqueId": "communities_subChapters_assignUsers",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "communities_subChapters",
                      "subMenuMappingId": "communities_subChapters_assignUsers",
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Users",
          "uniqueId": "users",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/transactions-icon.png",
          "link": "/admin/transactions/requestedList",
          "name": "transaction",
          "uniqueId": "transaction",
          "isLink": true,
          "isMenu": true,
          "subMenu": [
            {
              "link": "/admin/transactions/requestedList",
              "name": "Requests",
              "uniqueId": "transaction_Requestes",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "subMenu": [
                {
                  "link": "/admin/transactions/requestedList",
                  "name": "List Requests",
                  "uniqueId": "transaction_RequestList",
                  "subMenuMappingId": "transaction_Requestes",
                  "subMenusId": "transaction",
                  "isLink": true,
                  "isMenu": false,
                  "image": ""
                },
                {
                  "link": "/admin/transactions/editRequests",
                  "name": "Edit Requestes",
                  "uniqueId": "transaction_EditRequests",
                  "subMenuMappingId": "transaction_Requestes",
                  "subMenusId": "transaction",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""
                }
              ]
            },
            {
              "link": "/admin/transactions/approvedList",
              "name": "Approvals",
              "uniqueId": "transaction_Approved",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "subMenu": [
                {
                  "link": "/admin/transactions/approvedList",
                  "name": "List Requests",
                  "uniqueId": "transaction_ApprovedList",
                  "subMenuMappingId": "transaction_Approved",
                  "subMenusId": "transaction",
                  "isLink": true,
                  "isMenu": false,
                  "image": ""
                },
                {
                  "link": "/admin/transactions/editRequests",
                  "name": "Edit Requests",
                  "uniqueId": "transaction_EditApproved",
                  "subMenuMappingId": "transaction_Approved",
                  "subMenusId": "transaction",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""
                }
              ]
            },
            {
              "link": "/admin/transactions/registrationRequested",
              "name": "Registration",
              "uniqueId": "transaction_Registration",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "subMenusId": "transaction",
              "subMenuMappingId": "transaction_Registration",
              "subMenu": [
                {
                  "link": "/admin/transactions/registrationRequested",
                  "name": "Requested",
                  "uniqueId": "transaction_registration_requested",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "transaction_Registration",
                  "subMenuMappingId": "transaction_registration_requested",
                  "subMenu": [
                    {
                      "link": "/admin/transactions/registrationRequested",
                      "name": "Request List",
                      "uniqueId": "transaction_registration_requested_list",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "subMenusId": "transaction_Registration",
                      "subMenuMappingId": "transaction_registration_requested_list"
                    },
                    {
                      "link": "/admin/transactions/registrationRequested/edit",
                      "name": "Backend Users",
                      "uniqueId": "transaction_registration_requested_edit",
                      "isLink": true,
                      "isMenu": true,
                      "image": "",
                      "dynamicLink": true,
                      "dynamicLinkHandler": "",
                      "subMenusId": "transaction_Registration",
                      "subMenuMappingId": "transaction_registration_requested"
                    }
                  ]
                },
                {
                  "link": "/admin/transactions/registrationApprovedList",
                  "name": "Approved",
                  "uniqueId": "transaction_registration_approved",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "transaction_Registration",
                  "subMenuMappingId": "transaction_registration_approved"
                },

                {
                  "link": "/admin/transactions/createRegistration",
                  "name": "Create",
                  "uniqueId": "transaction_registration_create",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "transaction_Registration",
                }
              ]
            },
            {
              "link": "/admin/transactions/portfolio/requestedPortfolioList",
              "name": "Portfolio",
              "uniqueId": "portfolio",
              "isLink": true,
              "isMenu": true,
              "image": "",
              "subMenusId": "transaction",
              "subMenuMappingId": "portfolio",
              "subMenu": [
                {
                  "link": "/admin/transactions/portfolio/requestedPortfolioList",
                  "name": "Requested",
                  "uniqueId": "portfolio_requested",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "portfolio",
                  "subMenuMappingId": "portfolio_requested",
                  "subMenu": [
                    {
                      "image": "/images/cluster_icon.png",
                      "link": "/admin/transactions/portfolio/requestedPortfolioList/ideatorDetails",
                      "name": "Detail",
                      "uniqueId": "transaction_portfolio_EditRequests",
                      "isLink": true,
                      "isMenu": true,
                      "hideSubMenu": true,
                      "subMenusId": "portfolio_requested",
                    },
                    {
                      "image": "/images/cluster_icon.png",
                      "link": "/admin/transactions/portfolio/requestedPortfolioList/ideatorDetails",
                      "name": "Detail",
                      "uniqueId": "transaction_portfolio_viewPortfolio",
                      "isLink": true,
                      "isMenu": true,
                      "hideSubMenu": true,
                      "subMenusId": "portfolio_requested",
                    }
                  ]
                },
                {
                  "link": "/admin/transactions/portfolio/approvedPortfolioList",
                  "name": "Approved",
                  "uniqueId": "portfolio_approved",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "portfolio",
                  "subMenuMappingId": "portfolio_approved"
                },

                {
                  "link": "/admin/transactions/portfolio/createPortfolio",
                  "name": "Create",
                  "uniqueId": "portfolio_create",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "portfolio",
                  //"subMenuMappingId":"transaction_registration_create"
                },
                {
                  "link": "/admin/transactions/portfolio/history",
                  "name": "History",
                  "uniqueId": "portfolio_history",
                  "isLink": true,
                  "isMenu": true,
                  "image": "",
                  "subMenusId": "portfolio",
                },
              ]
            }
          ]
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Notifications",
          "uniqueId": "notifications",
          "isLink": true,
          "isMenu": true,
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Conversations",
          "uniqueId": "conversations",
          "isLink": true,
          "isMenu": true,
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
              "link" : "/admin/settings/templatesList",
              "name" : "Templates",
              "uniqueId" : "settings_templates",
              "isLink" : true,
              "isMenu" : true,
              "image" : "",
              subMenu:[
                {
                  "link": "/admin/settings/templatesList",
                  "name": "List Templates",
                  "uniqueId": "settings_templatesList",
                  "subMenuMappingId":"settings_templates",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": false,
                  "image": ""
                },
              ]
            },
            {
              "image" : "/images/cluster_icon.png",
              "link" : "/admin/settings/hierarchy/platformhierarchy",
              "name" : "Hierarchy",
              "uniqueId"   :"hierarchy_details",
              "isLink" : true,
              "isMenu" : true,
              "hideSubMenu":true,
              "subMenu":[
                {
                  "link": "/admin/settings/hierarchy/clusterhierarchy/:clusterId/chapters",
                  "name": "cluster hierarchy",
                  "uniqueId": "hierarchy",
                  "subMenuMappingId":"",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": false,
                  "image": "",
                  "subMenu":[
                    {
                      "link": "/settings/hierarchy/clusterhierarchy/:clusterId/hierarchyDetails",
                      "name": " cluster hierarchy",
                      "uniqueId": "hierarchy_chapters",
                      "subMenuMappingId":"",
                      "subMenusId":"settings",
                      "isLink": true,
                      "isMenu": false,
                      "image": ""
                    },
                  ]
                },
              ]
            },
            {
              "link" : "/admin/settings/rolesList",
              "name" : "Roles & Permissions",
              "uniqueId" : "settings_roles",
              "isLink" : true,
              "isMenu" : true,
              "image" : "",
              subMenu:[{
                "link": "/admin/settings/createRole",
                "name": "Add Roles",
                "uniqueId": "settings_createRole",
                "subMenuMappingId":"settings_roles",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
                {
                  "link": "/admin/settings/rolesList",
                  "name": "List Roles",
                  "uniqueId": "settings_rolesList",
                  "subMenuMappingId":"settings_roles",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": false,
                  "image": ""
                },
                {
                  "link": "/admin/settings/editRoleType",
                  "name": "Edit Roles",
                  "uniqueId": "settings_EditRole",
                  "subMenuMappingId":"settings_roles",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""
                }]
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
              "link" : "/admin/settings/taxationList",
              "name" : "Taxation",
              "uniqueId" : "settings_Taxations",
              "isLink" : true,
              "isMenu" : true,
              "image" : "",
              "subMenu": [

                {
                  "link": "/admin/settings/addTaxation",
                  "name": "Add Taxation",
                  "uniqueId": "settings_AddTaxation",
                  "subMenuMappingId":"settings_Taxations",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": false,
                  "image": ""
                },
                {
                  "link": "/admin/settings/taxationList",
                  "name": "List Taxation",
                  "uniqueId": "settings_TaxationList",
                  "subMenuMappingId":"settings_Taxations",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": false,
                  "image": ""
                },
                {
                  "link": "/admin/settings/editTaxation",
                  "name": "Edit Taxation",
                  "uniqueId": "settings_EditTaxation",
                  "subMenuMappingId":"settings_Taxations",
                  "subMenusId":"settings",
                  "isLink": true,
                  "isMenu": true,
                  "image": ""
                }
              ]
            },
            {
              "link" : "/admin/settings/Workflow",
              "name" : "Workflow",
              "uniqueId" : "settings_workflow",
              "isLink" : true,
              "isMenu" : true,
              "image" : "",
              "subMenusId":"portfolio",
            },
          ]
        },
        {
          "image": "/images/db_icon.png",
          "link": "",
          "name": "Offerings",
          "uniqueId": "offerings",
          "isLink": true,
          "isMenu": true,
        },
      ]
    }
  });
}