import { messaging } from './FirbaseNotifications-config';
import { getToken } from 'firebase/messaging';

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

        const fcmToken = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
        console.log("FCM Token:", fcmToken);

        if (fcmToken) {
            await sendTokenToServer(fcmToken);
        }

        return fcmToken;
    } catch (err) {
        console.error("Error during notification permission request:", err);
    }
};

const sendTokenToServer = async (token) => {
    try {
        const response = await fetch('/save-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fcmToken: token }),
        });

        const data = await response.json();
        console.log('Token sent to server:', data);
    } catch (error) {
        console.error('Error sending token to server:', error);
    }
};
