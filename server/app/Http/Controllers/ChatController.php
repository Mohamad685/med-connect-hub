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
            'sender_id' => 'required|integer|exists:users,id',
            'receiver_id' => 'required|integer|exists:users,id',
            'message' => 'required|string',
        ]);

        $sender = User::findOrFail($request->sender_id);
        $receiver = User::findOrFail($request->receiver_id);

        if (!in_array($sender->role, ['patient', 'doctor']) || !in_array($receiver->role, ['patient', 'doctor'])) {
            return response()->json(['message' => 'Unauthorized - One of the users does not have the required role'], 403);
        }

        $chat = new Chat();
        $chat->sender_id = $sender->id;
        $chat->receiver_id = $receiver->id;
        $chat->message = $request->message;
        $chat->save();

        return response()->json(['message' => 'Message sent successfully', 'chat' => $chat], 201);
    }


    public function fetchMessagesBetweenUsers(Request $request, $sender_id, $receiver_id)
    {
        $sender = User::findOrFail($sender_id);
        $receiver = User::findOrFail($receiver_id);

        if (!in_array($sender->role, ['patient', 'doctor']) || !in_array($receiver->role, ['patient', 'doctor'])) {
            return response()->json(['message' => 'Unauthorized - One of the users does not have the required role'], 403);
        }

        $messages = Chat::where(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $sender_id)->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $receiver_id)->where('receiver_id', $sender_id);
        })->get();

        return response()->json($messages);
    }

}
