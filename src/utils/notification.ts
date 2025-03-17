import notifee from '@notifee/react-native';

export async function onDisplayNotification(item: any) {
  await notifee.requestPermission()

  const channelId = await notifee.createChannel({
    id: `${item?.messageId}${item?.notification?.title}`,
    name: 'Gooday',
  });

  // Display a notification
  await notifee.displayNotification({
    title: item?.notification?.title,
    body: item?.notification?.body,
    data:item?.data,
    android: {
      channelId,
      pressAction: {
        id: 'dismiss',
      },
    },
  });
}