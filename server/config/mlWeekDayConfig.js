let weekDay = [
  {_id:'Monday',dayName:"Monday",displayName:"Monday",about:"","isActive":true},
  {_id:'Tuesday',dayName:"Tuesday",displayName:"Tuesday",about:"","isActive":true},
  {_id:'Wednesday',dayName:"Wednesday",displayName:"Wednesday",about:"","isActive":true},
  {_id:'Thursday',dayName:"Thursday",displayName:"Thursday",about:"","isActive":true},
  {_id:'Friday',dayName:"Friday",displayName:"Friday",about:"","isActive":true},
  {_id:'Saturday',dayName:"Saturday",displayName:"Saturday",about:"","isActive":true},
  {_id:'Sunday',dayName:"Sunday",displayName:"Sunday",about:"","isActive":true}
];
Meteor.startup(function () {
  for(var i = 0; i < weekDay.length; i++){
    let weekData = MlWeekDays.findOne({_id: weekDay[i]._id});
    if(!weekData){
      MlWeekDays.insert(weekDay[i]);
    }
  }
})

