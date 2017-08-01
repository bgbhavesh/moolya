
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
import MlNotificationsServices from './mlNotificationsServices';
import NotificationTemplateEngine from "../../commons/mlTemplateEngine";
var mlNotificationsServices=new MlNotificationsServices();
class MlNotificationControllerClass{

  // create new Notification.
  createNewAlert(request, context){

    //fetch the notification template
    var isNotifTemp=request.isNotifTemp||false;

    if(isNotifTemp){

      let templateCode=request.tempCode||'';
      let reqObj=request.reqObj||{};

      var notifContext=NotificationTemplateEngine.fetchTemplateContent(templateCode,"notif",reqObj);

      request.text=notifContext.content;
    }

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
