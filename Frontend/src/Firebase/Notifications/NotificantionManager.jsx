import { messaging, getToken } from "./Firebase-config"; 

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

        const fcm_token = await getToken(messaging, { vapidKey: "BN8h0qLxpg6hYB0kiZSzpLrjQPsfpTinxuhw653tMMNt90Np9im2rEzzit0BBykTnaCvdSW9D6UEI3juJmfmRIw" });
        console.log("FCM Token:", fcm_token);
        return fcm_token;
    } catch (err) {
        console.error("Error during notification permission request:", err);
    }
};
