/**
 * Created by vishwadeep on 21/6/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlBrowserMenu"}, {$set:{
    "name":"mlBrowserMenu",
    "menu" : [
      {
        "image":"ml ml-dashboard",
        "link": "/app/dashboard",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Dashboard",
        "uniqueId" : "dashboard"
      },
      {
        "image":"ml flaticon-ml-pc-search",
        "link": "/app/explore",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Explore",
        "uniqueId" : "explore"
      },
      {
        "image":"ml ml-transaction",
        "link": "/app/transaction",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Transactions",
        "uniqueId" : "myTransaction"
      },
      {
        "image":"ml ml-chat",
        "link": "/app/conversations",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Conversations",
        "uniqueId" : "conversations"
      },
      {
        "image":"ml ml-subscribe",
        "link": "/app/subscriptions",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Subscriptions",
        "uniqueId" : "subscriptions"
      },

      {
        "image":"ml ml-news",
        "link": "/app/news",
        "isLink" : true,
        "isMenu" : true,
        "name" : "News",
        "uniqueId" : "news"
      },
      {
        "image":"ml ml-settings",
        "link": "/app/news",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Settings",
        "uniqueId" : "settings"
      },
      {
        "image":"fa fa-calendar-check-o",
        "link": "/app/task",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Task",
        "uniqueId" : "my_task"
      }
    ]
  }});
}
