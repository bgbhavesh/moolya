/**
 * Created by venkatsrinag on 19/5/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlSubChapterAdminNonMoolya"},{$set:{
      "name" : "mlSubChapterAdminNonMoolya",
      "menu" : [
          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Dashboard",
              "uniqueId" : "dashboard",
              "isLink" : true,
              "isMenu" : true,
          },
          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Cluster",
              "uniqueId" : "cluster",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Chapter",
              "uniqueId" : "chapter",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Community",
              "uniqueId" : "community",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Users",
              "uniqueId" : "users",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Transcations",
              "uniqueId" : "transcations",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Notifications",
              "uniqueId" : "notifications",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Conversations",
              "uniqueId" : "conversations",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Settings",
              "uniqueId" : "settings",
              "isLink" : true,
              "isMenu" : true,
          },

          {
              "image" : "/images/db_icon.png",
              "link" : "",
              "name" : "Offerings",
              "uniqueId" : "offerings",
              "isLink" : true,
              "isMenu" : true,
          },

      ]

  }});
}
