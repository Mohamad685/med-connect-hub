<?php
namespace App\Services;

use App\Models\InsuranceApproval;
use App\Models\Symptom;
use App\Models\User; // Assuming this is where FCM tokens are stored
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Laravel\Firebase\Facades\FirebaseMessaging;

class InsuranceApprovalService
{
    public function updateApprovalStatus($approvalId, $status)
    {
        $approval = InsuranceApproval::findOrFail($approvalId);
        $approval->status = $status;
        $approval->save();

        $patientId = $this->getPatientIdFromApproval($approval);

        if ($patientId) {
            $user = User::where('patient_id', $patientId)->first();
            // if ($user && $user->fcm_token) {
            //     $this->sendNotification($user->fcm_token, $status);
            // }
        }
        return $approval;
    }

    // protected function sendNotification($token, $status)
    // {
    //     $title = $status === 'Accepted' ? 'Approval Accepted' : 'Approval Rejected';
    //     $body = "Your insurance request has been $status.";
    //     $message = CloudMessage::withTarget('token', $token)
    //         ->withNotification(Notification::create($title, $body));

    //     $messaging = Firebase::messaging();
    //     $messaging->send($message);
    // }

    protected function getPatientIdFromApproval(InsuranceApproval $approval)
    {
        $symptom = Symptom::find($approval->symptoms_id);
        return $symptom ? $symptom->patient_id : null;
    }
}
