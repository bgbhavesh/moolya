if(Meteor.isServer){
  MlMenus.upsert({name:"mlClusterAdminMenu"},{$set:{
    "name" : "mlClusterAdminMenu",
    "menu" : [
      {
        "image" : "ml my-ml-dashboard",
        "link" : "/admin/dashboard/chapters",
        "name" : "Ecosystem",
        "uniqueId" : "dashboard",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "",
            "name" : "Clusters",
            "uniqueId" : "dashboard_clusters",
            "subMenuMappingId":"",
            "subMenusId":"dashboard",
            "isLink" : false,
            "isDisabled":true,
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
                "image" : "",
                "subMenu": [
                  {
                    "link": "/admin/dashboard/anchorDetails",
                    "name": "Anchor Details",
                    "uniqueId": "dashboard_specSubChapters_anchorInfoView",
                    "isLink": true,
                    "isMenu": false,
                    "image": "",
                    "dynamicLink": true,
                    "dynamicLinkHandler": "",
                    "subMenusId": "dashboard",
                    "subMenuMappingId": "dashboard_chapters"
                  }
                ]
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
        "image" : "ml my-ml-cluster",
        "link" : "/admin/clusters",
        "name" : "Cluster",
        "uniqueId"   :"cluster",
        "isLink" : true,
        "isMenu" : true,
        "hideSubMenu":true,
        "subMenu":[
          {
            "link" : "/admin/clusters/clusterDetails",
            "name" : "Cluster Details",
            "uniqueId" : "cluster_clusterDetails",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"cluster",
            "subMenuMappingId":"cluster_clusterDetails"
          },
          {
            "link" : "/admin/clusters/chapters",
            "name" : "Chapters",
            "uniqueId" : "cluster_chapters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"cluster",
            "subMenuMappingId":"cluster_chapters",
            "subMenu":[
              {
                "link" : "/admin/clusters/subChapters/subChapterDetails",
                "name" : "Sub Chapter Details",
                "uniqueId" : "cluster_chapter_subChapterDetails",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId":"cluster_chapters",
                "subMenuMappingId":"cluster_chapter_subChapterDetails"
              },
              {
                "link" : "/admin/clusters/subChapters/communities",
                "name" : "Communities",
                "uniqueId" : "cluster_chapter_communities",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId":"cluster_chapters",
                "subMenuMappingId":"cluster_chapter_communities",
                "subMenu":[
                  {
                    "link" : "/admin/clusters/subChapters/communities/communityDetails",
                    "name" : "Community Details",
                    "uniqueId" : "cluster_chapter_communities_communityDetails",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"cluster_chapter_communities",
                    "subMenuMappingId":"cluster_chapter_communities_communityDetails"
                  },
                  {
                    "link" : "/admin/clusters/subChapters/communities/assignusers",
                    "name" : "Backend Users",
                    "uniqueId" : "cluster_chapter_communities_assignusers",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"cluster_chapter_communities",
                    "subMenuMappingId":"cluster_chapter_communities_assignusers"
                  }
                ]
              },
              {
                "link" : "/admin/clusters/subChapters/assignusers",
                "name" : "Backend Users",
                "uniqueId" : "cluster_chapter_assignusers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId":"cluster_chapters",
                "subMenuMappingId":"cluster_chapter_assignusers"
              },
              {
                "link": "/admin/clusters/history",
                "name": "History",
                "uniqueId": "cluster_history",
                "isLink": true,
                "isMenu": true,
                "image": "",
                "dynamicLink": true,
                "dynamicLinkHandler": "",
                "subMenusId": "cluster",
                "subMenuMappingId": "cluster_history"
              }
            ]
          },
          {
            "link" : "/admin/clusters/communities",
            "name" : "Communities",
            "uniqueId" : "cluster_communities",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"cluster",
            "subMenuMappingId":"cluster_communities",
            "subMenu":[
              {
                "link" : "/admin/clusters/communities/communityDetails",
                "name" : "Community Details",
                "uniqueId" : "cluster_communities_communityDetails",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId":"cluster_communities",
                "subMenuMappingId":"cluster_communities_communityDetails"
              },
              {
                "link" : "/admin/clusters/communities/assignusers",
                "name" : "Backend Users",
                "uniqueId" : "cluster_communities_assignusers",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId":"cluster_communities",
                "subMenuMappingId":"cluster_communities_assignusers"
              }
            ]
          },
          {
            "link" : "/admin/clusters/assignusers",
            "name" : "Backend Users",
            "uniqueId" : "cluster_assignusers",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"cluster",
            "subMenuMappingId":"cluster_assignusers"
          },
          {
            "link" : "/admin/clusters/history",
            "name" : "History",
            "uniqueId" : "cluster_history",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"cluster",
            "subMenuMappingId":"cluster_history"
          }
        ]

      },
      {
        "image" : "ml my-ml-chapter",
        "link" : "/admin/chapters",
        "uniqueId" : "chapter",
        "name" : "Chapter",
        "isLink" : true,
        "isMenu" : true,
        "hideSubMenu":true,
        "subMenu":[
          {
            "link" : "/admin/chapters",
            "name" : "Chapters",
            "uniqueId" : "chapter_chapters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "hideSubMenu":true,
            "dynamicLinkHandler" : "",
            "subMenusId":"chapter",
            "subMenuMappingId":"chapter_chapters",
            "subMenu":[
              {
                // "link" : "/admin/chapters/subChapters",
                // "name" : "Sub Chapters",
                // "uniqueId" : "chapter_subChapters",
                // "isLink" : true,
                // "isMenu" : true,
                // "image" : "",
                // "dynamicLink" : true,
                // "hideSubMenu":true,
                // "dynamicLinkHandler" : "",
                // "subMenusId":"chapter_chapters",
                // "subMenuMappingId":"chapter_subChapters",
                // "subMenu" : [
                //   {
                    "link" : "/admin/chapters/subChapters/subChapterDetails",
                    "name" : "SubChapterDetails",
                    "uniqueId" : "chapter_subChapterDetails",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"chapter_chapters",
                    "subMenuMappingId":"chapter_subChapterDetails"
                  },
                  {
                    "link" : "/admin/chapters/subChapters/communities",
                    "name" : "Communities",
                    "uniqueId" : "chapter_communities",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"chapter_chapters",
                    "subMenuMappingId":"chapter_communities",
                    "subMenu" : [
                      {
                        "link" : "/admin/chapters/subChapters/communities/communityDetails",
                        "name" : "Community Details",
                        "uniqueId" : "chapter_communities_communityDetails",
                        "isLink" : true,
                        "isMenu" : true,
                        "image" : "",
                        "dynamicLink" : true,
                        "dynamicLinkHandler" : "",
                        "subMenusId":"chapter_communities",
                        "subMenuMappingId":"chapter_communities_communityDetails"
                      },
                      {
                        "link" : "/admin/chapters/subChapters/communities/assignusers",
                        "name" : "Backend Users",
                        "uniqueId" : "chapter_communities_assignusers",
                        "isLink" : true,
                        "isMenu" : true,
                        "image" : "",
                        "dynamicLink" : true,
                        "dynamicLinkHandler" : "",
                        "subMenusId":"chapter_communities",
                        "subMenuMappingId":"chapter_communities_assignusers"
                      },
                    ]
                  },
                  {
                    "link" : "/admin/chapters/assignusers",
                    "name" : "Backend Users",
                    "uniqueId" : "chapter_assignusers",
                    "isLink" : true,
                    "isMenu" : true,
                    "image" : "",
                    "dynamicLink" : true,
                    "dynamicLinkHandler" : "",
                    "subMenusId":"chapter_chapters",
                    "subMenuMappingId":"chapter_assignusers"
                  },
              {
                "link": "/admin/chapters/history",
                "name": "History",
                "uniqueId": "chapter_history",
                "isLink": true,
                "isMenu": true,
                "image": "",
                "dynamicLink": true,
                "dynamicLinkHandler": "",
                "subMenusId": "chapter_chapters",
                "subMenuMappingId": "chapter_history"
              }
                ]
            //   }
            // ]
          },
          {
            "link" : "/admin/chapters/subChapters",
            "name": "Sub Chapters",
            "uniqueId": "chapter_subChapters",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "dynamicLink": true,
            "hideSubMenu": true,
            "dynamicLinkHandler": "",
            "subMenusId": "chapter",
            "subMenuMappingId":"chapter_subChapters"
          }
        ]
      },
      {
        "image" : "ml my-ml-community",
        "link" : "/admin/community",
        "uniqueId" : "community",
        "name" : "Community",
        "isLink" : true,
        "isMenu" : true,
        "hideSubMenu":true,
        "subMenu" : [
          {
            "link" : "/admin/community/communityDetails",
            "name" : "Community Details",
            "uniqueId" : "community_Community_Details",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"community",
            "subMenuMappingId":"community_Community_Details"
          },
          {
            "link": "/admin/community/history",
            "name": "History",
            "uniqueId": "community_Histroy_Details",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "dynamicLink": true,
            "dynamicLinkHandler": "",
            "subMenusId": "community",
            "subMenuMappingId": "community_Histroy_Details"
          },
        ]
      },
      {
        "image" : "ml my-ml-documents_2",
        "link" : "/admin/documents/clusterList",
        "name" : "Documents",
        "uniqueId" : "documents",
        "isLink" : true,
        "isMenu" : true
      },
      /**
       * admin left nav users routes
       */
      {
        "image": "ml my-ml-users",
        "link": "/admin/users/clusters",
        "name": "Users",
        "uniqueId": "users",
        "isLink": true,
        "isMenu": true,
        "subMenu": [
          {
            "link" : "/admin/users/clusters",
            "name" : "Cluster",
            "uniqueId" : "users_cluster",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId" : "users",
            "subMenuMappingId" : "users_cluster",
            "subMenu" : [
              {
                "link" : "/admin/users/aboutuser",
                "name" : "About",
                "uniqueId" : "users_about",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId" : "users_cluster",
                "subMenuMappingId" : "users_about"
              },
              {
                "link" : "/admin/users/addressBook",
                "name" : "Address Book",
                "uniqueId" : "users_addressBook",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId" : "users_cluster",
                "subMenuMappingId" : "users_addressBook"
              },
              {
                "link": "/admin/users/portfolio",
                "name": "Portfolio",
                "uniqueId": "users_portfolio",
                "isLink": true,
                "isMenu": true,
                "image": "",
                "dynamicLink": true,
                "dynamicLinkHandler": "",
                "subMenusId": "users_cluster",
                "subMenuMappingId": "users_portfolio"
              },
              {
                "link" : "/admin/users/connections",
                "name" : "Connections",
                "uniqueId" : "users_connections",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId" : "users_cluster",
                "subMenuMappingId" : "users_connections"
              },
              {
                "link" : "/admin/users/favourites",
                "name" : "Favourites",
                "uniqueId" : "users_favourites",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId" : "users_cluster",
                "subMenuMappingId" : "users_favourites"
              },
              {
                "link" : "/admin/users/transactions",
                "name" : "Transactions",
                "uniqueId" : "users_transactions",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId" : "users_cluster",
                "subMenuMappingId" : "users_transactions"
              },
              {
                "link" : "/admin/users/library",
                "name" : "Library",
                "uniqueId" : "users_library",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "subMenusId" : "users_cluster",
                "subMenuMappingId" : "users_library"
              }
            ]
          },
          {
            "link": "/admin/users/history",
            "name": "History",
            "uniqueId": "users_History",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenu": [
              {
                "link": "/admin/documents/history",
                "name": "List Clusters",
                "uniqueId": "users_HistoryList",
                "subMenuMappingId": "users_HistoryList",
                "subMenusId": "users_cluster",
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          }
        ]
      },
      {
        "image" : "ml my-ml-templates",
        "link" : "/admin/templates/templateList",
        "name" : "Templates",
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
          },
          {
            "link": "/admin/templates/history",
            "name": "History",
            "uniqueId": "templates_History",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenu": [
              {
                "link": "/admin/templates/history",
                "name": "Templates History",
                "uniqueId": "templates_HistoryList",
                "subMenuMappingId": "templates_History",
                "subMenusId": "templates",
                "isLink": true,
                "isMenu": false,
                "image": ""
              }
            ]
          },
        ]
      },
      {
        "image" : "ml my-ml-transactions",
        "link" : "/admin/transactions/requestedList",
        "name" : "Transactions",
        "uniqueId"   :"transaction",
        "isLink" : true,
        "isMenu" : true,
        "subMenu":[
          {
            "link" : "/admin/transactions/requestedList",
            "name" : "Internal Requests",
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
            "name" : "Requests Approved",
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
            "link" : "/admin/transactions/rejectList",
            "name" : "Requests Rejected",
            "uniqueId" : "transaction_Reject",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/transactions/rejectedList",
                "name": "List Requests",
                "uniqueId": "transaction_RejectedList",
                "subMenuMappingId":"transaction_Reject",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/transactions/editRequests",
                "name": "Edit Requests",
                "uniqueId": "transaction_EditRejected",
                "subMenuMappingId":"transaction_Reject",
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
                    "subMenuMappingId":"transaction_registration_requested"
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
                "subMenuMappingId":"transaction_registration_approved",
                "subMenu": [
                  {
                    "link": "/admin/transactions/registrationApprovedList",
                    "name": "Request List",
                    "uniqueId": "transaction_registration_approved_list",
                    "isLink": true,
                    "isMenu": true,
                    "image": "",
                    "subMenusId": "transaction_Registration",
                    "subMenuMappingId": "transaction_registration_approved_list"
                  },
                  {
                    "link": "/admin/transactions/registrationRequested/edit",
                    "name": "Backend Users",
                    "uniqueId": "transaction_registration_approved_edit",
                    "isLink": true,
                    "isMenu": true,
                    "image": "",
                    "dynamicLink": true,
                    "dynamicLinkHandler": "",
                    "subMenusId": "transaction_Registration",
                    "subMenuMappingId": "transaction_registration_approved"
                  }
                ]
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
              },
              {
                "link" : "/admin/transactions/rejectedRegistrations",
                "name" : "Reject",
                "uniqueId" : "transaction_registration_reject",
                "isLink" : true,
                "isMenu" : true,
                "image" : "",
                "subMenusId":"transaction_Registration",
                //"subMenuMappingId":"transaction_registration_create"
              },
              {
                "link": "/admin/transactions/registrationHistory",
                "name": "History",
                "uniqueId": "transaction_registration_history",
                "isLink": true,
                "isMenu": true,
                "image": "",
                "subMenusId": "transaction_Registration",
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
            "link" : "/admin/transactions/office",
            "name" : "Office",
            "uniqueId" : "transaction_office_list",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu" : [
              {
                "link" : "/admin/transactions/office",
                "name" : "Office",
                "uniqueId" : "transaction_office",
                "subMenuMappingId" : "transaction_office_list",
                "subMenusId" : "transaction",
                "isLink" : true,
                "isMenu" : false,
                "image" : ""
              }
            ]
          },
          {
            "link" : "/admin/transactions/processSetupList",
            "name" : "ProcessSetUp",
            "uniqueId" : "transaction_ProcessSetup",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/transactions/processSetupList",
                "name": "List Process Setup",
                "uniqueId": "transaction_ProcessSetupList",
                "subMenuMappingId":"transaction_ProcessSetup",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/transactions/editProcessSetup",
                "name": "Edit Process Setup",
                "uniqueId": "transaction_EditProcessSetup",
                "subMenuMappingId":"transaction_ProcessSetup",
                "subMenusId":"transaction",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },

          {
            "link": "/admin/transactions/shareList",
            "name": "Share",
            "uniqueId": "transaction_Share",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenu": [
              {
                "link": "/admin/transactions/shareList",
                "name": "List Share",
                "uniqueId": "transaction_ShareList",
                "subMenuMappingId": "transaction_Share",
                "subMenusId": "transaction",
                "isLink": true,
                "isMenu": false,
                "image": ""
              }
              // {
              //   "link": "/admin/transactions/editProcessSetup",
              //   "name": "Edit Process Setup",
              //   "uniqueId": "transaction_EditProcessSetup",
              //   "subMenuMappingId": "transaction_ProcessSetup",
              //   "subMenusId": "transaction",
              //   "isLink": true,
              //   "isMenu": true,
              //   "image": ""
              // }
            ]
          },

          {
            "link": "/admin/transactions/systemsLog ",
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
          },
          {
            "link": "/admin/transactions/serviceCardsList",
            "name": "Service Cards",
            "uniqueId": "Service_Cards",
            "subMenusId": "transaction",
            "isLink": true,
            "isMenu": true,
            "image": ""
          },
          {
            "link": "/admin/transactions/history",
            "name": "History",
            "uniqueId": "History_Log",
            "isLink": true,
            "isMenu": true,
            "image": "",
            "subMenusId": "transaction"
          },
        ]
      },
      {
        "image" : "ml my-ml-settings_new",
        "link" : "/admin/settings/regionalsList",
        "name" : "Settings",
        "uniqueId" : "settings",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/settings/regionalsList",
            "name" : "Regional",
            "uniqueId" : "settings_Regional",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addregional",
                "name": "Add Regional",
                "uniqueId": "settings_AddRegional",
                "subMenuMappingId":"settings_Regional",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/regionalsList",
                "name": "List Regional",
                "uniqueId": "settings_RegionalsList",
                "subMenuMappingId":"settings_Regional",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editRegional",
                "name": "Edit Regional",
                "uniqueId": "settings_EditRegional",
                "subMenuMappingId":"settings_Regional",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/settings/taxTypeList",
            "name" : "Tax Types",
            "uniqueId" : "settings_TaxTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addTaxType",
                "name": "Add TaxTypes",
                "uniqueId": "settings_AddTaxType",
                "subMenuMappingId":"settings_TaxTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/taxTypeList",
                "name": "List TaxType",
                "uniqueId": "settings_TaxTypeList",
                "subMenuMappingId":"settings_TaxTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editTaxType",
                "name": "Edit TaxType",
                "uniqueId": "settings_EditTaxType",
                "subMenuMappingId":"settings_TaxTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
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
            "link" : "/admin/settings/titleList",
            "name" : "Title",
            "uniqueId" : "settings_Titles",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addTitle",
                "name": "Add Title",
                "uniqueId": "settings_AddTitle",
                "subMenuMappingId":"settings_Titles",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/titleList",
                "name": "List Title",
                "uniqueId": "settings_TitleList",
                "subMenuMappingId":"settings_Titles",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editTitle",
                "name": "Edit Title",
                "uniqueId": "settings_EditTitle",
                "subMenuMappingId":"settings_Titles",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/settings/languagesList",
            "name" : "Language",
            "uniqueId" : "settings_Language",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [
              {
                "link": "/admin/settings/addLanguage",
                "name": "Add Language",
                "uniqueId": "settings_AddLanguage",
                "subMenuMappingId":"settings_Language",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/languagesList",
                "name": "List Language",
                "uniqueId": "settings_LanguagesList",
                "subMenuMappingId":"settings_Language",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editLanguage",
                "name": "Edit Language",
                "uniqueId": "settings_EditLanguage",
                "subMenuMappingId":"settings_Language",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/settings/dateAndTimeList",
            "name" : "Date And Time",
            "uniqueId" : "settings_DateAndTime",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addDateAndTime",
                "name": "Add Date And Time",
                "uniqueId": "settings_AddDateAndTime",
                "subMenuMappingId":"settings_DateAndTime",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/dateAndTimeList",
                "name": "List Date And Time",
                "uniqueId": "settings_DateAndTimeList",
                "subMenuMappingId":"settings_DateAndTime",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editDateAndTime",
                "name": "Edit Date And Time",
                "uniqueId": "settings_EditDateAndTime",
                "subMenuMappingId":"settings_DateAndTime",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {                                  // @Created By Sireesha on 23-02-2017 for Cluster Admin Settings Employee Type
            "link" : "/admin/settings/employeeTypesList",
            "name" : "Employee Types",
            "uniqueId" : "settings_EmployeeTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addEmployeeType",
                "name": "Add EmployeeType",
                "uniqueId": "settings_AddEmployeeType",
                "subMenuMappingId":"settings_EmployeeTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/employeeTypesList",
                "name": "List EmployeeTypes",
                "uniqueId": "settings_employeeTypesList",
                "subMenuMappingId":"settings_EmployeeTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editEmployeeType",
                "name": "Edit EmployeeType",
                "uniqueId": "settings_EditEmployeeType",
                "subMenuMappingId":"settings_EmployeeTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              },

            ]
          },  // @End
          {                                  // @Created By Sireesha on 24-02-2017 for Cluster Admin Settings Company Type
            "link" : "/admin/settings/companyTypesList",
            "name" : "Company Types",
            "uniqueId" : "settings_CompanyTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addCompanyType",
                "name": "Add Company Type",
                "uniqueId": "settings_AddCompanyType",
                "subMenuMappingId":"settings_CompanyTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/companyTypesList",
                "name": "List CompanyTypes",
                "uniqueId": "settings_CompanyTypesList",
                "subMenuMappingId":"settings_CompanyTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editCompanyType",
                "name": "Edit Company Type",
                "uniqueId": "settings_EditCompanyType",
                "subMenuMappingId":"settings_CompanyTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              },

            ]
          },  // @End

          {
            "link" : "/admin/settings/addressTypeList",
            "name" : "Address Type",
            "uniqueId" : "settings_AddressType",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addAddressType",
                "name": "Add Address Type",
                "uniqueId": "settings_AddAddressType",
                "subMenuMappingId":"settings_AddressType",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/addressTypeList",
                "name": "List Address Type",
                "uniqueId": "settings_AddressTypeList",
                "subMenuMappingId":"settings_AddressType",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editAddressType",
                "name": "Edit Address Type",
                "uniqueId": "settings_EditAddressType",
                "subMenuMappingId":"settings_AddressType",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/settings/numericalFormatList",
            "name" : "Numerical Format",
            "uniqueId" : "settings_NumericalFormat",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addNumericalFormat",
                "name": "Add Numerical Format",
                "uniqueId": "settings_AddNumericalFormat",
                "subMenuMappingId":"settings_NumericalFormat",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/numericalFormatList",
                "name": "List Numerical Format",
                "uniqueId": "settings_NumericalFormatList",
                "subMenuMappingId":"settings_NumericalFormat",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editNumericalFormat",
                "name": "Edit Numerical Format",
                "uniqueId": "settings_EditNumericalFormat",
                "subMenuMappingId":"settings_NumericalFormat",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {
            "link" : "/admin/settings/socialLinkTypeList",
            "name" : "Social Link Type",
            "uniqueId" : "settings_SocialLinkType",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addSocialLinkType",
                "name": "Add Social Link Type",
                "uniqueId": "settings_AddSocialLinkType",
                "subMenuMappingId":"settings_SocialLinkType",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/socialLinkTypeList",
                "name": "List Social Link Type",
                "uniqueId": "settings_SocialLinkTypeList",
                "subMenuMappingId":"settings_SocialLinkType",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editSocialLinkType",
                "name": "Edit Social Link Type",
                "uniqueId": "settings_EditSocialLinkType",
                "subMenuMappingId":"settings_SocialLinkType",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          // {
          //   "link" : "/admin/settings/gendersList",
          //   "name" : "Gender",
          //   "uniqueId" : "settings_Gender",
          //   "isLink" : true,
          //   "isMenu" : true,
          //   "image" : "",
          //   "subMenu": [
          //
          //     {
          //       "link": "/admin/settings/addGender",
          //       "name": "Add Gender",
          //       "uniqueId": "settings_AddGender",
          //       "subMenuMappingId":"settings_Gender",
          //       "subMenusId":"settings",
          //       "isLink": true,
          //       "isMenu": false,
          //       "image": ""
          //     },
          //     {
          //       "link": "/admin/settings/gendersList",
          //       "name": "List Gender",
          //       "uniqueId": "settings_GenderList",
          //       "subMenuMappingId":"settings_Gender",
          //       "subMenusId":"settings",
          //       "isLink": true,
          //       "isMenu": false,
          //       "image": ""
          //     },
          //     {
          //       "link": "/admin/settings/editGender",
          //       "name": "Edit Gender",
          //       "uniqueId": "settings_EditGender",
          //       "subMenuMappingId":"settings_Gender",
          //       "subMenusId":"settings",
          //       "isLink": true,
          //       "isMenu": true,
          //       "image": ""
          //     }
          //   ]
          // },
          {                                  // @Created By Sireesha on 24-02-2017 for Cluster Admin Settings Email Type
            "link" : "/admin/settings/emailTypesList",
            "name" : "Email Types",
            "uniqueId" : "settings_EmailTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addCompanyType",
                "name": "Add EmailType",
                "uniqueId": "settings_AddEmailType",
                "subMenuMappingId":"settings_EmailTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/emailTypesList",
                "name": "List EmailTypes",
                "uniqueId": "settings_EmailTypesList",
                "subMenuMappingId":"settings_EmailTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editEmailType",
                "name": "Edit EmailType",
                "uniqueId": "settings_EditEmailType",
                "subMenuMappingId":"settings_EmailTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              },

            ]
          },  // @End
          {                                  // @Created By Sireesha on 24-02-2017 for Cluster Admin Settings Contact Type
            "link" : "/admin/settings/contactTypesList",
            "name" : "Contact Types",
            "uniqueId" : "settings_ContactTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addContactType",
                "name": "Add ContactType",
                "uniqueId": "settings_AddContactType",
                "subMenuMappingId":"settings_ContactTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/contactTypesList",
                "name": "List ContactTypes",
                "uniqueId": "settings_ContactTypesList",
                "subMenuMappingId":"settings_ContactTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editContactType",
                "name": "Edit EmailType",
                "uniqueId": "settings_EditContactType",
                "subMenuMappingId":"settings_ContactTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              },

            ]
          },  // @End
          {
            "link" : "/admin/settings/cluster/history",
            "name" : "History",
            "uniqueId" : "clusterSettings_history",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

                  {
                    "link": "/admin/settings/cluster/history",
                    "name": "History",
                    "uniqueId": "clusterSettings_historyList",
                    "subMenuMappingId":"clusterSettings_history",
                    "subMenusId":"settings",
                    "isLink": true,
                    "isMenu": false,
                    "image": ""
                  }
              ]
          }
        ]
      },
    ]
  }});
}
