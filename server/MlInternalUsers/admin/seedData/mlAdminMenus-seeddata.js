if(Meteor.isServer){
  MlMenus.upsert({name:"mlAdminMenu"},{$set:{
    "name" : "mlAdminMenu",
    "menu" : [
      {
        "image" : "/images/db_icon.png",
        "link" : "/admin/dashboard/clusters",
        "name" : "dashboard",
        "uniqueId" : "dashboard",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/dashboard/clusters",
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
        "link" : "/admin/clusters",
        "name" : "cluster",
        "uniqueId"   :"cluster",
        "isLink" : true,
        "isMenu" : true,
        "hideSubMenu":true,
        "subMenu":[
          {
            "link" : "/admin/clusters/clusterDetails",
            "name" : "clusterDetails",
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
            "name" : "chapters",
            "uniqueId" : "cluster_chapters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"cluster",
            "subMenuMappingId":"cluster_chapters"
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
            "subMenuMappingId":"cluster_communities"
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
          }
        ]

      },
      {
        "image" : "/images/chapter_icon.png",
        "link" : "/admin/chapters",
        "uniqueId" : "chapter",
        "name" : "chapter",
        "isLink" : "true",
        "isMenu" : true,
        "subMenu" : [
          {
            "link" : "/admin/chapters/subChapters/subChapterDetails",
            "name" : "SubChapterDetails",
            "uniqueId" : "chapter_subChapterDetails",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"chapter",
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
            "subMenusId":"chapter",
            "subMenuMappingId":"chapter_communities"
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
            "subMenusId":"chapter",
            "subMenuMappingId":"chapter_assignusers"
          }
        ]
      },
      {
        "image" : "/images/community_icon.png",
        "link" : "/admin/community",
        "uniqueId" : "community",
        "name" : "community",
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
            "link" : "/admin/community/assignusers",
            "name" : "Backend Users",
            "uniqueId" : "community_assignusers",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "dynamicLink" : true,
            "dynamicLinkHandler" : "",
            "subMenusId":"community",
            "subMenuMappingId":"community_assignusers"
          }
        ]
      },
      {
        "image" : "/images/documents_icon.png",
        "link" : "/admin/documents",
        "uniqueId" : "documents",
        "name" : "documents",
        "isLink" : true,
        "isMenu" : true
      },
      {
        "image" : "/images/services_icon.png",
        "link" : "/admin/services",
        "name" : "services",
        "isLink" : true,
        "isMenu" : true,
        "uniqueId" : "services"
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
            "link" : "/admin/settings/rolesList",
            "name" : "Roles",
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
                "link": "/admin/settings/documentTypeList",
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
          },
          {
            "link" : "/admin/settings/documentFormatList",
            "name" : "Document Format",
            "uniqueId" : "settings_documentFormats",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addDocumentFormat",
              "name": "Add Document Format",
              "uniqueId": "settings_AddDocumentFormat",
              "subMenuMappingId":"settings_documentFormats",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/documentFormatList",
                "name": "List Document Format",
                "uniqueId": "settings_DocumentFormatList",
                "subMenuMappingId":"settings_documentFormats",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editDocumentFormat",
                "name": "Edit Document Format",
                "uniqueId": "settings_EditDocumentFormat",
                "subMenuMappingId":"settings_documentFormats",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/kycCategoryList",
            "name" : "KYC Category",
            "uniqueId" : "settings_kycCategories",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addKycCategory",
              "name": "Add KYC Category",
              "uniqueId": "settings_AddKycCategory",
              "subMenuMappingId":"settings_kycCategories",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/kycCategoryList",
                "name": "List KYC Categories",
                "uniqueId": "settings_KycCategoryList",
                "subMenuMappingId":"settings_kycCategories",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editKycCategory",
                "name": "Edit KYC Category",
                "uniqueId": "settings_EditKycCategory",
                "subMenuMappingId":"settings_kycCategories",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/documentMappingList",
            "name" : "Document Mapping",
            "uniqueId" : "settings_DocumentMapping",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addDocumentMapping",
              "name": "Add Document Mapping",
              "uniqueId": "settings_AddDocumentMapping",
              "subMenuMappingId":"settings_DocumentMapping",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/documentMappingList",
                "name": "List Document Mapping",
                "uniqueId": "settings_DocumentMappingList",
                "subMenuMappingId":"settings_DocumentMapping",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editDocumentMapping",
                "name": "Edit Document Mapping",
                "uniqueId": "settings_EditDocumentMapping",
                "subMenuMappingId":"settings_DocumentMapping",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/industryList",
            "name" : "Industry Types",
            "uniqueId" : "settings_industryTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addIndustry",
              "name": "Add IndustryType",
              "uniqueId": "settings_AddIndustryType",
              "subMenuMappingId":"settings_industryTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/industryList",
                "name": "List IndustryType",
                "uniqueId": "settings_IndustryTypeList",
                "subMenuMappingId":"settings_industryTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editIndustry",
                "name": "Edit IndustryType",
                "uniqueId": "settings_EditIndustryType",
                "subMenuMappingId":"settings_industryTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/specificationList",
            "name" : "Specification Types",
            "uniqueId" : "settings_specificationTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addSpecification",
              "name": "Add SpecificationType",
              "uniqueId": "settings_AddSpecificationType",
              "subMenuMappingId":"settings_specificationTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/specificationList",
                "name": "List SpecificationType",
                "uniqueId": "settings_SpecificationTypeList",
                "subMenuMappingId":"settings_specificationTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editSpecification",
                "name": "Edit SpecificationType",
                "uniqueId": "settings_EditSpecificationType",
                "subMenuMappingId":"settings_specificationTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/professionList",
            "name" : "Profession Types",
            "uniqueId" : "settings_professionTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addProfession",
              "name": "Add ProfessionType",
              "uniqueId": "settings_AddProfessionType",
              "subMenuMappingId":"settings_professionTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/professionList",
                "name": "List ProfessionType",
                "uniqueId": "settings_ProfessionTypeList",
                "subMenuMappingId":"settings_professionTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editProfession",
                "name": "Edit ProfessionType",
                "uniqueId": "settings_EditProfessionType",
                "subMenuMappingId":"settings_professionTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/entityList",
            "name" : "Entity Types",
            "uniqueId" : "settings_entityTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addEntity",
              "name": "Add EntityType",
              "uniqueId": "settings_AddEntityType",
              "subMenuMappingId":"settings_entityTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/entityList",
                "name": "List EntityType",
                "uniqueId": "settings_EntityTypeList",
                "subMenuMappingId":"settings_entityTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editEntity",
                "name": "Edit EntityType",
                "uniqueId": "settings_EditEntityType",
                "subMenuMappingId":"settings_entityTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/stageOfCompanyList",
            "name" : "StageOfCompany Types",
            "uniqueId" : "settings_stageOfCompanyTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addStageOfCompany",
              "name": "Add StageOfCompanyType",
              "uniqueId": "settings_AddStageOfCompanyType",
              "subMenuMappingId":"settings_stageOfCompanyTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/stageOfCompanyList",
                "name": "List StageOfCompanyType",
                "uniqueId": "settings_StageOfCompanyTypeList",
                "subMenuMappingId":"settings_stageOfCompanyTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editStageOfCompany",
                "name": "Edit StageOfCompanyType",
                "uniqueId": "settings_EditStageOfCompanyType",
                "subMenuMappingId":"settings_stageOfCompanyTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/businessList",
            "name" : "Business Types",
            "uniqueId" : "settings_businessTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addBusiness",
              "name": "Add BusinessType",
              "uniqueId": "settings_AddBusinessType",
              "subMenuMappingId":"settings_businessTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/businessList",
                "name": "List BusinessType",
                "uniqueId": "settings_BusinessTypeList",
                "subMenuMappingId":"settings_businessTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editBusiness",
                "name": "Edit BusinessType",
                "uniqueId": "settings_EditBusinessType",
                "subMenuMappingId":"settings_businessTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/citizenshipList",
            "name" : "Citizenship Types",
            "uniqueId" : "settings_citizenshipTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addCitizenship",
              "name": "Add CitizenshipType",
              "uniqueId": "settings_AddCitizenshipType",
              "subMenuMappingId":"settings_citizenshipTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/citizenshipList",
                "name": "List CitizenshipType",
                "uniqueId": "settings_CitizenshipTypeList",
                "subMenuMappingId":"settings_citizenshipTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editCitizenship",
                "name": "Edit CitizenshipType",
                "uniqueId": "settings_EditCitizenshipType",
                "subMenuMappingId":"settings_citizenshipTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/lookingForList",
            "name" : "LookingFor Types",
            "uniqueId" : "settings_lookingForTypes",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addLookingFor",
              "name": "Add LookingForType",
              "uniqueId": "settings_AddLookingForType",
              "subMenuMappingId":"settings_lookingForTypes",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/lookingForList",
                "name": "List LookingForType",
                "uniqueId": "settings_LookingForTypeList",
                "subMenuMappingId":"settings_lookingForTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editLookingFor",
                "name": "Edit LookingForType",
                "uniqueId": "settings_EditLookingForType",
                "subMenuMappingId":"settings_lookingForTypes",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }]
          },
          {
            "link" : "/admin/settings/processList",
            "name" : "Process Types",
            "uniqueId" : "settings_Process",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            subMenu:[{
              "link": "/admin/settings/addProcess",
              "name": "Add Process",
              "uniqueId": "settings_addProcess",
              "subMenuMappingId":"settings_Process",
              "subMenusId":"settings",
              "isLink": true,
              "isMenu": false,
              "image": ""
            },
              {
                "link": "/admin/settings/processList",
                "name": "List Process",
                "uniqueId": "settings_processList",
                "subMenuMappingId":"settings_Process",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editProcess",
                "name": "Edit Process",
                "uniqueId": "settings_editProcess",
                "subMenuMappingId":"settings_Process",
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
