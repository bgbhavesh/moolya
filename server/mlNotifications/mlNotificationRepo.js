/**
 * Created by venkatsrinag on 9/7/17.
 */
import mlConversationsRepo from '../commons/Conversations/mlConversationsRepo'

class NotificationRepo {
  constructor() {
  }

  sendNotification(data) {
    mlConversationsRepo.createNotifications(data)
  }
}

const mlNotificationRepo = new NotificationRepo();
Object.freeze(mlNotificationRepo);

export default mlNotificationRepo;
