const cron = require('node-cron');
import MlCronJobController from './cronJobController';

var task = cron.schedule('1 01 17 * * *', Meteor.bindEnvironment(() => {    
    MlCronJobController.dailyReport();
    console.log('................................................');
}), false);
    
task.start();
