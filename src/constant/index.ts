import { PushNotificationObject } from "react-native-push-notification"

enum APP {
    BACKGROUND_TASK_NAME = "BackgroundTask"
}

const NOTIFICATION_CONFIG: PushNotificationObject = {
    channelId: "blackholeav-id",
    autoCancel: false,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    bigText: "We have detected a new file, please wait for scanning malware",
    subText: "Anti-malware is our mission",
    bigLargeIcon: "ic_launcher",
    color: "red",
    vibrate: true,
    vibration: 3000,
    group: "group",
    groupSummary: false,
    ongoing: false,
    priority: "high",
    visibility: "private",
    ignoreInForeground: false,
    shortcutId: "shortcut-id",
    onlyAlertOnce: false,
    invokeApp: true,
    id: 0,
    title: "BlackHoleAV Notification",
    message: "Scanning malware",
}

const NOTIFICATION_CONFIG_CLEAN: PushNotificationObject = {
    channelId: "blackholeav-id",
    autoCancel: false,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    subText: "Anti-malware is our mission",
    bigLargeIcon: "ic_launcher",
    vibrate: true,
    vibration: 3000,
    group: "group",
    groupSummary: false,
    ongoing: false,
    priority: "high",
    visibility: "private",
    ignoreInForeground: false,
    shortcutId: "shortcut-id",
    onlyAlertOnce: false,
    invokeApp: true,
    id: 1,
    title: "BlackHoleAV Notification",
    bigText: "File clean, No malware found",
    color: "green",
    message: "Scan finished",
}

const NOTIFICATION_CONFIG_MALWARE: PushNotificationObject = {
    channelId: "blackholeav-id",
    autoCancel: false,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    subText: "Anti-malware is our mission",
    bigLargeIcon: "ic_launcher",
    vibrate: true,
    vibration: 3000,
    group: "group",
    groupSummary: false,
    ongoing: false,
    priority: "high",
    visibility: "private",
    ignoreInForeground: false,
    shortcutId: "shortcut-id",
    onlyAlertOnce: false,
    invokeApp: true,
    id: 1,
    title: "BlackHoleAV Notification",
    bigText: "Malware found",
    color: "red",
    message: "Scan finished",
}

export default {
    APP,
    NOTIFICATION_CONFIG,
    NOTIFICATION_CONFIG_CLEAN,
    NOTIFICATION_CONFIG_MALWARE
}