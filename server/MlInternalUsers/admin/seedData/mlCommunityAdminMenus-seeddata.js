/**
 * Created by venkatasrinag on 20/3/17.
 */
/**
 * Created by venkatasrinag on 20/3/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlCommunityAdminMenu"},{$set:{
    "name" : "mlCommunityAdminMenu",
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
        // "link" : "/admin/clusters",
        "name" : "cluster",
        "uniqueId"   :"cluster",
        "isLink" : false,
        "isMenu" : false,
        "hideSubMenu":true,
        "isDisabled":true,
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
        "uniqueId" : "documents",
        "isLink" : true,
        "isMenu" : true
      },
      {
        "image" : "/images/services_icon.png",
        "link" : "/admin/services",
        "name" : "services",
        "uniqueId" : "services",
        "isLink" : true,
        "isMenu" : true
      },
      {
        "image" : "/images/settings_icon.png",
        "link" : "/admin/settings/regionalsList",
        "name" : "settings",
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
            "name" : "EmployeeTypes",
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
            "name" : "CompanyTypes",
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
          {
            "link" : "/admin/settings/gendersList",
            "name" : "Gender",
            "uniqueId" : "settings_Gender",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "subMenu": [

              {
                "link": "/admin/settings/addGender",
                "name": "Add Gender",
                "uniqueId": "settings_AddGender",
                "subMenuMappingId":"settings_Gender",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/gendersList",
                "name": "List Gender",
                "uniqueId": "settings_GenderList",
                "subMenuMappingId":"settings_Gender",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": false,
                "image": ""
              },
              {
                "link": "/admin/settings/editGender",
                "name": "Edit Gender",
                "uniqueId": "settings_EditGender",
                "subMenuMappingId":"settings_Gender",
                "subMenusId":"settings",
                "isLink": true,
                "isMenu": true,
                "image": ""
              }
            ]
          },
          {                                  // @Created By Sireesha on 24-02-2017 for Cluster Admin Settings Email Type
            "link" : "/admin/settings/emailTypesList",
            "name" : "EmailTypes",
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
            "name" : "ContactTypes",
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
        ]
      },
    ]
  }});
}
