if(Meteor.isServer){
  MlMenus.upsert({name:"mlClusterAdminMenu"},{$set:{
    "name" : "mlClusterAdminMenu",
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
        "isMenu" : true
      },

      {
        "link" : "/admin/clusters/clusterview/",
        "name" : "cluster",
        "uniqueId"   :"cluster",
        "isLink" : true,
        "isMenu" : true,
        "isdynamic":true,
        "subMenu":[
          {
            "link" : "/admin/cluster/clusterDetails",
            "name" : "clusterDetails",
            "uniqueId" : "cluster",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
          }
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
        "link" : "/admin/settings/taxTypeList",
        "name" : "settings",
        "uniqueId" : "settings",
        "isLink" : true,
        "isMenu" : true,
        "subMenu" : [
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


        ]
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


        ]
      }
    ]
  }});
}
