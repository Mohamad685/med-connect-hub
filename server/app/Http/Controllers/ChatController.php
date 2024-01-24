<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function storeMessage(Request $request)
{
    $message = Chat::create([
        'sender_id' => $request->sender_id,
        'receiver_id' => $request->receiver_id,
        'message' => $request->message,
    ]);

    $this->pushMessageToFirebase($message);

    return response()->json($message, 201);
}
}
