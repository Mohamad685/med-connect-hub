<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ChatController extends Controller
{   
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|integer|exists:users,id',
            'message' => 'required|string',
        ]);

        $sender = Auth::user();

        if (!in_array($sender->role, ['patient', 'doctor'])) {
            return response()->json(['message' => 'Unauthorized - Sender does not have the required role'], 403);
        }

        $receiver = User::findOrFail($request->receiver_id);
        
        if (!in_array($receiver->role, ['patient', 'doctor'])) {
            return response()->json(['message' => 'Unauthorized - Receiver does not have the required role'], 403);
        }

        $chat = new Chat();
        $chat->sender_id = $sender->id;
        $chat->receiver_id = $request->receiver_id;
        $chat->message = $request->message;
        $chat->save();

        return response()->json(['message' => 'Message sent successfully', 'chat' => $chat], 201);
    }

}
