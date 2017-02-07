if(Meteor.isServer){
  MlChapters.upsert({chapterId:"ch001"},{$set: {
    "clusterId": "c101",
    "chapterName": "Hyderabad",
    "about": "Hyderabad",
    "displayName": "Hyderabad",
    "state" : "Telangana",
    "latitude": "17.385044",
    "longitude": "78.486671",
    "email": "moolya@moolya.in",
    "showOnMap": false,
    "isActive": false
  }});
}
