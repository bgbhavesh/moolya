/**
 * Created by viswadeep on 19/6/17.
 */
if(Meteor.isServer){
  MlMenus.upsert({name:"mlCalendarMenu"}, {$set:{
    "name":"mlCalendarMenu",
    "menu" : [
      {
        "image":"ml my-ml-calendar",
        "link": "/app/calendar",
        "isLink" : true,
        "isMenu" : true,
        "name" : "My Calendar",
        "uniqueId" : "mycalendar"
      },
      {
        "image":"ml my-ml-calendar",
        "link": "/app/calendar/clientCalendar",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Client Calendar",
        "uniqueId" : "calendar_client"
      },

      {
        "image":"ml my-ml-calendar",
        "link": "/app/calendar/officeCalendar",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Office Calendar",
        "uniqueId" : "calendar_office"
      },

      {
        "image":"ml my-ml-settings_new",
        "link": "/app/calendar/settings",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Settings",
        "uniqueId" : "calendar_settings"
      },

      {
        "image":"ml my-ml-notifications",
        "link": "/app/calendar/notification",
        "isLink" : true,
        "isMenu" : true,
        "name" : "Notifications",
        "uniqueId" : "calendar_notification"
      },

      // {
      //   "image":"fa fa-calendar-check-o",
      //   "link": "/app/calendar/manageSchedule/all/activityList",
      //   "isLink" : true,
      //   "isMenu" : true,
      //   "name" : "Manage Schedule",
      //   "uniqueId" : "calendar_manageSchedule"
      // }
    ]
  }});
}
