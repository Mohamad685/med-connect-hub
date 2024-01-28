<?php
namespace App\Services;

use App\Models\InsuranceApproval;
use App\Models\Symptom;
use App\Models\User;
use Illuminate\Http\Request;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Laravel\Firebase\Facades\FirebaseMessaging;

class InsuranceApprovalService
{
    public function updateApprovalStatus( $approvalId, $status)
{
    $approval = InsuranceApproval::findOrFail($approvalId);
    $approval->status = $status === 'accept' ? 'Accepted' : 'Rejected';
    $approval->save();

    return response()->json(['message' => 'Insurance approval status updated', 'approval' => $approval]);


    // if ($patientId) {
    //     $user = User::where('patient_id', $patientId)->first();
        // Uncomment and modify the following line if you want to send notifications
        // if ($user && $user->fcm_token) {
        //     $this->sendNotification($user->fcm_token, $status);
        // }
    // }
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
