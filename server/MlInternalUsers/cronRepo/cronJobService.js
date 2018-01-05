const cron = require('node-cron');
import MlCronJobController from './cronJobController';

var task = cron.schedule('5 * * * * *', function () {
    console.log('immediately started');
    MlCronJobController.dailyReport();
}, false);

//todo:  [Error: Can't wait without a fiber] need to solve the error    
// task.start();