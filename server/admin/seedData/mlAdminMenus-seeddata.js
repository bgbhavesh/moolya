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
            "name" : "clusters",
            "id" : "clusters",
            "isLink" : true,
            "isMenu" : true,
            "image" : "",
            "submenu" : [
              {
                "dynamicLink" : true,
                "dynamicLinkHandler" : "",
                "name" : "cluster Details",
                "id" : "clusterDetails",
                "isMenu" : true,
                "image" : ""
              }
            ]
          },
          {
            "link" : "/admin/dashboard/chapter",
            "name" : "chapters",
            "id" : "chapters",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/dashboard/chapter",
            "name" : "communities",
            "id" : "communities",
            "isLink" : true,
            "image" : ""
          },
          {
            "link" : "/admin/dashboard/chapter",
            "name" : "users",
            "id" : "users",
            "isLink" : true,
            "image" : ""
          }
        ]
      },
      {
        "image" : "/images/cluster_icon.png",
        "link" : "/admin/cluster",
        "name" : "cluster",
        "isLink" : true,
        "isMenu" : true
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
