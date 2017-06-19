/**
 * Created by viswadeep on 19/6/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlCalendarMenu"}, {$set:{
    "name":"mlCalendarMenu",
    "menu" : [
      {
        "image":"ml ml-ideator",
        "link": "/app/calendar",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Calendar",
        "uniqueId" : "calendar"
      },
      {
        "image":"",
        "link": "/app/calendar/clientCalendar",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Client Calendar",
        "uniqueId" : "calendar_client"
      },

      {
        "image":"",
        "link": "/app/calendar/officeCalendar",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Office Calendar",
        "uniqueId" : "calendar_office"
      },

      {
        "image":"",
        "link": "/app/calendar/settings",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Settings",
        "uniqueId" : "calendar_settings"
      },

      {
        "image":"",
        "link": "/app/calendar/notification",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Notifications",
        "uniqueId" : "calendar_notification"
      },

      {
        "image":"",
        "link": "/app/calendar/manageSchedule",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Manage Schedule",
        "uniqueId" : "calendar_manageSchedule"
      }
    ]
  }});
}