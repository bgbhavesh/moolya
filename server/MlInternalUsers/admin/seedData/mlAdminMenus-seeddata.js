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
            "link" : "/admin/cluster/clusters",
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
        "name" : "chapter",
        "isLink" : "true",
        "isMenu" : true
      },
      {
        "image" : "/images/community_icon.png",
        "link" : "/admin/community",
        "name" : "community",
        "isLink" : true,
        "isMenu" : true
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
        "link" : "/admin/services",
        "name" : "settings",
        "isLink" : true,
        "isMenu" : true
      }
    ]
  }});
}
