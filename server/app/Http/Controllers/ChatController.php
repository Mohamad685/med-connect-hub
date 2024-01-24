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
    protected function pushMessageToFirebase($message)
    {
        try {
            $firebase = app('firebase');
            $database = $firebase->createDatabase();

            $newPost = $database
                ->getReference('chats')
                ->push([
                    'sender_id' => $message->sender_id,
                    'receiver_id' => $message->receiver_id,
                    'message' => $message->message,
                    'created_at' => $message->created_at->toDateTimeString(),
                ]);

            return $newPost->getKey();
        } catch (\Throwable$e) {
            \Log::error("Firebase push failed: " . $e->getMessage());
        }

    }

}
