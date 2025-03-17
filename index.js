/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import messagingApp from '@react-native-firebase/app';
import notifee from '@notifee/react-native';

// Crashlytics Firebase
if (!messagingApp.apps.length) {
  console.log('messagingApp.apps', messagingApp.apps)
  Crashlytics().setCrashlyticsCollectionEnabled(true);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      await notifee.cancelNotification(notification.id);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      await notifee.cancelNotification(notification.id);
      break;
  }
});

notifee.onForegroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      await notifee.cancelNotification(notification.id);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      await notifee.cancelNotification(notification.id);
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);
