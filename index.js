/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import CONST from './src/constant';
import BackgroundTask from './src/core/BackgroundTask';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
    {
        channelId: "blackholeav-id",
        channelName: "BlackHoleAV Notification",
        channelDescription: "A channel to categorise BlackHoleAV notifications",
        importance: 4,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

AppRegistry.registerHeadlessTask(CONST.APP.BACKGROUND_TASK_NAME, () => BackgroundTask);
AppRegistry.registerComponent(appName, () => App);
