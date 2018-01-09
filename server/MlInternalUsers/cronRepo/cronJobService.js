const cron = require('node-cron');
const Future = Npm.require('fibers/future');
import MlCronJobController from './cronJobController';

var task = cron.schedule('2 * * * * *', Meteor.bindEnvironment(() => {    
    MlCronJobController.dailyReport();
    console.log('................................................');
}), false);
    
// task.start();
Meteor.startup(function () {
    task.start();
})
