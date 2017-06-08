/**
 * Created by vishwadeep on 31/5/17.
 */

if(Meteor.isServer){
  MlMenus.upsert({name:"mlCommunityAdminNonMoolya"},{$set:{
    "name" : "mlCommunityAdminNonMoolya",
    "menu" : [
      {
        "image" : "/images/db_icon.png",
        "link" : "/admin/dashboard/chapters",
        "name" : "dashboard",
        "uniqueId" : "dashboard",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "name" : "Clusters",
            "uniqueId" : "dashboard_clusters",
            "subMenuMappingId":"dashboard_clusters",
            "subMenusId":"dashboard",
            "isLink" : true,
            "isMenu" : true,
            "image" : ""
          },
          {
            "link" : "/admin/dashboard/chapters",
            "name" : "Chapters",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "uniqueId" : "dashboard_chapters",
            "subMenuMappingId":"dashboard_chapters",
            "subMenusId":"dashboard",
            "isLink" : true,
            "image" : "",
            "subMenu":[
              {
                "link" : "/admin/dashboard/clusters",
                "name" : "SpecChapters",
                "uniqueId" : "dashboard_specChapters",
                "subMenuMappingId":"dashboard_chapters",
                "subMenusId":"dashboard",
                "isLink" : true,
                "isMenu" : true,
                "image" : ""

              },
              {
                "link" : "/admin/dashboard/clusters",
                "name" : "SpecSubChapters",
                "uniqueId" : "dashboard_specSubChapters",
                "subMenuMappingId":"dashboard_chapters",
                "subMenusId":"dashboard",
                "isLink" : true,
                "isMenu" : true,
                "image" : ""

              }]
          },
          {
            "link" : "/admin/dashboard/communities",
            "name" : "Communities",
            "uniqueId" : "dashboard_communities",
            "subMenuMappingId":"dashboard_communities",
            "subMenusId":"dashboard",
            "isLink" : true,
            "image" : ""
          },

        ]
      },
      {
        "image" : "/images/cluster_icon.png",
        "link" : "",
        "name" : "cluster",
        "uniqueId"   :"cluster",
        "isLink" : false,
        "isMenu" : true,
        "hideSubMenu":true,
        "isDisabled":true
      },
      {
        "image" : "/images/chapter_icon.png",
        // "link" : "/admin/chapters",
        "uniqueId" : "chapter",
        "name" : "chapter",
        "isLink" : false,
        "isMenu" : false,
        "isDisabled":true,
      },
      {
        "image" : "/images/community_icon.png",
        "link" : "/admin/communities",
        "uniqueId" : "community",
        "name" : "community",
        "isLink" : true,
        "isMenu" : true,
        "hideSubMenu":true,
        "subMenu":[
          {
            "link" : "/admin/community/chapter",
            "name" : "Chapter",
            "uniqueId" : "communities_chapters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"community",
            "hideSubMenu":true,
            "subMenuMappingId":"communities_chapters",
            "subMenu":[
              {
                "link" : "/admin/community/chapter/subChapter",
                "name" : "Sub Chapter",
                "uniqueId" : "communities_subChapters",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId":"communities_chapters",
                "hideSubMenu":true,
                "subMenuMappingId":"communities_subChapters",
                // "subMenu":[
                //   {
                //     "link" : "/admin/community/chapter/subChapter/community",
                //     "name" : "Community",
                //     "uniqueId" : "communities_communities",
                //     "isLink" : true,
                //     "isMenu" : true,
                //     "image" : "",
                //     "dynamicLink" : true,
                //     "dynamicLinkHandler" : "",
                //     "hideSubMenu":true,
                //     "subMenusId":"communities_subChapters",
                //     "subMenuMappingId":"communities_communities",
                "subMenu" : [
                  {
                    "link" : "/admin/community/subChapter/community/communityDetails",
                    "name" : "Community Details",
                    "uniqueId" : "communities_subChapters_communityDetails",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"communities_subChapters",
                    "subMenuMappingId":"communities_subChapters_communityDetails",
                  },
                  {
                    "link" : "/admin/community/subChapter/community/assignuser",
                    "name" : "Backend User",
                    "uniqueId" : "communities_subChapters_assignUsers",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"communities_subChapters",
                    "subMenuMappingId":"communities_subChapters_assignUsers",
                  }
                ]
                //   }
                // ]
              }
            ]
          }
        ]
      },
      {
        "image" : "/images/documents_icon.png",
        "link" : "/admin/documents/clusterList",
        "uniqueId" : "documents",
        "name" : "documents",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/documents/clusterList",
            "name" : "Cluster",
            "uniqueId" : "documents_Clusters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/documents/clusterList",
                "name": "List Clusters",
                "uniqueId": "documents_ClusterList",
                "subMenuMappingId":"documents_Clusters",
                "subMenusId":"documents",
                "isLink": true,
                "isMenu": false,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/documents/chapterList",
            "name" : "Chapter",
            "uniqueId" : "documents_Chapter",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/documents/chapterList",
                "name": "List Clusters",
                "uniqueId": "documents_ChapterList",
                "subMenuMappingId":"documents_Chapter",
                "subMenusId":"documents",
                "isLink": true,
                "isMenu": false,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/documents/communityList",
            "name" : "Community",
            "uniqueId" : "documents_Community",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/documents/communityList",
                "name": "List Clusters",
                "uniqueId": "documents_CommunityList",
                "subMenuMappingId":"documents_Community",
                "subMenusId":"documents",
                "isLink": true,
                "isMenu": false,
                "image": ""
              }
            ]
          }
        ]

      },
      {
        "image" : "/images/services_icon.png",
        "link" : "/admin/templates/templateList",
        "name" : "templates",
        "isLink" : true,
        "isMenu" : true,
        "uniqueId" : "templates",
        "subMenu": [
          {
            "link": "/admin/templates/templateList",
            "name": "Template List",
            "uniqueId": "templates_List",
            "subMenuMappingId":"",
            "subMenusId":"templates",
            "isLink": true,
            "isMenu": false,
            "image": "",
            "subMenu":[
              {
                "link": "/templates/assignTemplate/:id",
                "name": "Edit Template",
                "uniqueId": "templates_assignment_edit",
                "subMenuMappingId":"",
                "subMenusId":"templates",
                "isLink": true,
                "isMenu": false,
                "image": "",
                "subMenu":[
                  {
                    "link": "/templates/assignTemplate/",
                    "name": " Assign Template",
                    "uniqueId": "templates_assignment",
                    "subMenuMappingId":"",
                    "subMenusId":"templates",
                    "isLink": true,
                    "isMenu": false,
                    "image": ""
                  }

                ]
              },
            ]
          }
        ]
      },
      {
        "image" : "/images/transactions-icon.png",
        "link" : "/admin/transactions/requestedList",
        "name" : "transaction",
        "uniqueId"   :"transaction",
        "isLink" : true,
        "isMenu" : true,
        "subMenu":[
          {
            "link" : "/admin/transactions/requestedList",
            "name" : "Requests",
            "uniqueId" : "transaction_Requestes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/transactions/requestedList",
                "name": "List Requests",
                "uniqueId": "transaction_RequestList",
                "subMenuMappingId":"transaction_Requestes",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/transactions/editRequests",
                "name": "Edit Requestes",
                "uniqueId": "transaction_EditRequests",
                "subMenuMappingId":"transaction_Requestes",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/transactions/approvedList",
            "name" : "Approvals",
            "uniqueId" : "transaction_Approved",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/transactions/approvedList",
                "name": "List Requests",
                "uniqueId": "transaction_ApprovedList",
                "subMenuMappingId":"transaction_Approved",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/transactions/editRequests",
                "name": "Edit Requests",
                "uniqueId": "transaction_EditApproved",
                "subMenuMappingId":"transaction_Approved",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/transactions/registrationRequested",
            "name" : "Registration",
            "uniqueId" : "transaction_Registration",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenusId":"transaction",
            "subMenuMappingId":"transaction_Registration",
            "subMenu":[
              {
                "link" : "/admin/transactions/registrationRequested",
                "name" : "Requested",
                "uniqueId" : "transaction_registration_requested",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"transaction_Registration",
                "subMenuMappingId":"transaction_registration_requested",
                "subMenu":[
                  {
                    "link" : "/admin/transactions/registrationRequested",
                    "name" : "Request List",
                    "uniqueId" : "transaction_registration_requested_list",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "subMenusId":"transaction_Registration",
                    "subMenuMappingId":"transaction_registration_requested_list"
                  },
                  {
                    "link" : "/admin/transactions/registrationRequested/edit",
                    "name" : "Backend Users",
                    "uniqueId" : "transaction_registration_requested_edit",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"transaction_Registration",
                    //"subMenuMappingId":"transaction_registration_requested_edit"
                  }
                ]
              },
              {
                "link" : "/admin/transactions/registrationApprovedList",
                "name" : "Approved",
                "uniqueId" : "transaction_registration_approved",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"transaction_Registration",
                "subMenuMappingId":"transaction_registration_approved"
              },

              {
                "link" : "/admin/transactions/createRegistration",
                "name" : "Create",
                "uniqueId" : "transaction_registration_create",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"transaction_Registration",
                //"subMenuMappingId":"transaction_registration_create"
              }
            ]
          },
          {
            "link" : "/admin/transactions/portfolio/requestedPortfolioList",
            "name" : "Portfolio",
            "uniqueId" : "portfolio",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenusId":"transaction",
            "subMenuMappingId":"portfolio",
            "subMenu":[
              {
                "link" : "/admin/transactions/portfolio/requestedPortfolioList",
                "name" : "Requested",
                "uniqueId" : "portfolio_requested",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"portfolio",
                "subMenuMappingId":"portfolio_requested",
                "subMenu":[
                  {
                    "image" : "/images/cluster_icon.png",
                    "link" : "/admin/transactions/portfolio/requestedPortfolioList/ideatorDetails",
                    "name" : "Detail",
                    "uniqueId"   :"transaction_portfolio_EditRequests",
                    "isLink" : true,
                    "isMenu" : true,
                    "hideSubMenu":true,
                    "subMenusId":"portfolio_requested",
                  },
                  {
                    "image" : "/images/cluster_icon.png",
                    "link" : "/admin/transactions/portfolio/requestedPortfolioList/ideatorDetails",
                    "name" : "Detail",
                    "uniqueId"   :"transaction_portfolio_viewPortfolio",
                    "isLink" : true,
                    "isMenu" : true,
                    "hideSubMenu":true,
                    "subMenusId":"portfolio_requested",
                  }
                ]
              },
              {
                "link" : "/admin/transactions/portfolio/approvedPortfolioList",
                "name" : "Approved",
                "uniqueId" : "portfolio_approved",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"portfolio",
                "subMenuMappingId":"portfolio_approved"
              },

              // {
              //   "link" : "/admin/transactions/portfolio/createPortfolio",
              //   "name" : "Create",
              //   "uniqueId" : "portfolio_create",
              //   "isLink" : true,
              //   "isMenu" : true,
              //   "image" : "",
              //   "subMenusId":"portfolio",
              //   //"subMenuMappingId":"transaction_registration_create"
              // },
              {
                "link" : "/admin/transactions/portfolio/history",
                "name" : "History",
                "uniqueId" : "portfolio_history",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"portfolio",
                //"subMenuMappingId":"transaction_registration_create"
              },
              // {
              //   "link" : "/admin/transactions/portfolio/requestedPortfolioList/edit",
              //   "name" : "Edit",
              //   "uniqueId" : "transaction_portfolio_requested_edit",
              //   "isLink" : true,
              //   "isMenu" : true,
              //   "image" : "",
              //   "subMenusId":"portfolio"
              // },
              //
              // {
              //   "link" : "/admin/transactions/portfolio/editRequests",
              //   "name" : "Edit",
              //   "uniqueId" : "transaction_portfolio_EditRequests",
              //   "isLink" : true,
              //   "isMenu" : true,
              //   "image" : "",
              //   "subMenusId":"portfolio"
              // },
              // {
              //   "link" : "/admin/transactions/portfolio/viewPortfolio",
              //   "name" : "Edit",
              //   "uniqueId" : "transaction_portfolio_viewPortfolio",
              //   "isLink" : true,
              //   "isMenu" : true,
              //   "image" : "",
              //   "subMenusId":"portfolio"
              // }
            ]
          },
          {
            "link": "/admin/transactions/systemsLog  ",
            "name": "System",
            "uniqueId": "systems_Log",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenusId": "transaction"
            // "subMenuMappingId":"Transactions_Log"
          },
          {
            "link": "/admin/transactions/interactionsLog ",
            "name": "Interactions",
            "uniqueId": "Interactions_Log",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenusId": "transaction"
            // "subMenuMappingId":"Transactions_Log"
          },
          {
            "link": "/admin/transactions/conversationsLog ",
            "name": "Conversations",
            "uniqueId": "Conversations_Log",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenusId": "transaction"
            // "subMenuMappingId":"Transactions_Log"
          }
        ]
      },
      {
        "image" : "/images/settings_icon.png",
        "link" : "",
        "name" : "settings",
        "uniqueId" : "settings",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : []
      },
    ]
  }});
}