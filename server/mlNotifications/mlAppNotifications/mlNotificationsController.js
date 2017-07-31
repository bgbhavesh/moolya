
/*-----------------------------------------------------------------------
 * @ file        : mlNotificationsController.js
 * @ description : Includes all Notifications controller operations.
 * @ author      : Duddukuri Mahesh
 * @ date        : 28/07/2017.
 -----------------------------------------------------------------------*/

`use strict`;

/*--------------------------------------------
 * Include internal and external modules.
 ---------------------------------------------*/
import MlNotificationsServices from '../mlNotifications/mlNotificationsServices'

var mlNotificationsServices=new MlNotificationsServices();
class MlNotificationControllerClass{

  // create new Notification.
  createNewAlert(request, context){
    mlNotificationsServices.createNewAlert(request, context);
  }

  // Update Notification read / delete status.
  updateNotifyStatus(request, context) {
    mlNotificationsServices.updateNotifyStatus(request, context);
  }

  // Fetch user Notifications.
  getUserAlerts(request, context) {
        mlNotificationsServices.getUserAlerts(request, context);
  }

  // Fetch user Notifications with server side pagination.
  fetchNotifiPagination(request, context){
    mlNotificationsServices.fetchNotifiPagination(request, context);
  }


}

const MlNotificationController = new MlNotificationControllerClass();
Object.freeze(MlNotificationController);

export default MlNotificationController;

