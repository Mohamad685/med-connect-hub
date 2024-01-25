<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SaveFcMTokenController extends Controller
{
    public function saveFcmToken(Request $request)
    {
        $user = auth()->user();
        $user->fcm_token = $request->fcm_token;
        $user->save();
    
        return response()->json(['message' => 'FCM token updated successfully.']);
    }}
