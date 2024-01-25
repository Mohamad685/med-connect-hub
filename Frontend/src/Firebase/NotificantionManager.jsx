import { messaging } from "./Firebase-config"; 

export const requestNotificationPermissionAndRetrieveToken = async () => {
    if (!messaging) {
        console.log("Firebase Messaging is not supported.");
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.log("Unable to get permission to notify.");
            return;
        }

        const token = await messaging.getToken();
        console.log("FCM Token:", token);
        return token;
    } catch (err) {
        console.error("Error during notification permission request:", err);
    }
};
