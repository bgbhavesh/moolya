const cron = require('node-cron');
import MlCronJobController from './cronJobController';

var task = cron.schedule('10 * * * * *', Meteor.bindEnvironment(() => {    
    MlCronJobController.dailyReport();
    console.log('................................................');
}), false);
    
// task.start();
Meteor.startup(function () {
    // task.start();
})
