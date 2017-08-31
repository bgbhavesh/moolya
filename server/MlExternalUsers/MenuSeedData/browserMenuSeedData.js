/**
 * Created by vishwadeep on 21/6/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlBrowserMenu"}, {$set:{
    "name":"mlBrowserMenu",
    "menu" : [
      {
        "image":"ml my-ml-dashboard",
        "link": "/app/dashboard",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Dashboard",
        "uniqueId" : "dashboard"
      },
      {
        "image":"ml my-ml-explore",
        "link": "/app/explore",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Explore",
        "uniqueId" : "explore"
      },
      {
        "image":"ml my-ml-transactions",
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
        "image":"ml my-ml-subscriptions",
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
        "image":"ml my-ml-settings1",
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
