/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import NavigationServices from './src/navigations/NavigationServices';
import Scenes from './src/navigations/Scenes';

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
        console.log("ON NOTIFICATION:", notification);
        NavigationServices.navigate(Scenes.alarmScreen, {
            data: {
                id: notification.id,
                title: notification.title,
                message: notification.message,
                date: notification?.fireDate
            }
        });
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("ON ACTION NOTIFICATION:", notification);

        // process the action
    },

    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
});


AppRegistry.registerComponent(appName, () => App);
