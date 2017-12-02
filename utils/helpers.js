import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const NOTIFICATION_KEY = 'PF:daily_notification';

export const createNotification = () => ({
  title: 'Practice makes (near) perfect!',
  body: "Don't forget to practice today!",
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
});

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              // notifications start tomorrow at 8:00 PM and repeat each day
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              tomorrow.setSeconds(0);
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
};

export const clearLocalNotification = () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
