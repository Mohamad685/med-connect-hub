<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SaveFcMTokenController extends Controller
{
    public function saveFcmToken(Request $request)
    {
        $request->validate([
            'fcmToken' => 'required|string'
        ]);
    
        $user = Auth::user();
        $user->fcm_token = $request->fcmToken;
        $user->save();
    
        return response()->json(['message' => 'FCM token saved successfully.']);
    }}
