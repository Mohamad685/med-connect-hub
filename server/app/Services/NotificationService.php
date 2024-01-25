<?php
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Laravel\Firebase\Facades\Firebase;




class NotificationService{
    public function sendTo($title,$token,$body){
        $messaging=Firebase::messaging();
        $message=CloudMessage::withTarget('token',$token)->withNotification(Notification::create($title,$body));
        $messaging=send($message);

    }
}