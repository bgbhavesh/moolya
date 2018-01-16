/**
 * Created by venkatsrinag on 9/7/17.
 */
import mlConversationsRepo from '../commons/Conversations/mlConversationsRepo'

class NotificationRepo{
  constructor(){
  }

  sendNotification(data){
    mlConversationsRepo.createNotifications(data)
  }

  updateFirebaseId(data, cb){
  	let newFireBaseId = data.firebaseId;
  	let update = mlDBController.update('users', data.userId, 
  		{	
  			"profile.firebaseId":data.firebaseId, 
  			"profile.isAllowedNotifications": data.isAllowedNotifications
   		},
   		{
   			$set:true
   		},
   		data
   	);
   	cb();
  }
}

const mlNotificationRepo = new NotificationRepo();
Object.freeze(mlNotificationRepo);

export default mlNotificationRepo;
