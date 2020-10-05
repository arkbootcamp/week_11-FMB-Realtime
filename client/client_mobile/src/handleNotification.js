import PushNotification from 'react-native-push-notification';

const showLocalNotification = (title, message, channelId) => {
  PushNotification.localNotification({
    channelId,
    title,
    message,
  });
};

const showLocalNotificationScheduled = (title, message, channelId) => {
  PushNotification.localNotificationSchedule({
    channelId,
    title,
    message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

const cancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {
  showLocalNotification,
  showLocalNotificationScheduled,
  cancelAllNotification,
};
