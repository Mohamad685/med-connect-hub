import fetchHelper from "../../Components/Functions/FetchFunction";

const sendTokenToServer = async (fcmToken) => {
    try {
        const url = '/api/save-fcm-token'; // Adjust this URL to your actual API endpoint
        const data = { fcm_token: fcmToken };
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        };

        const response = await fetchHelper.post(url, data, headers);

        console.log('FCM token sent to server successfully:', response);
    } catch (error) {
        console.error('Error sending FCM token to server:', error);
    }
};

export default sendTokenToServer;