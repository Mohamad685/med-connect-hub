<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Kreait\Firebase\Firestore;


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
            $firestore = app(Firestore::class);
            $database = $firestore->database();

            $chatsCollection = $database->collection('chats');
            $newDocument = $chatsCollection->add([
                'sender_id' => $message->sender_id,
                'receiver_id' => $message->receiver_id,
                'message' => $message->message,
                'created_at' => $message->created_at->toDateTimeString(),
            ]);

            return $newDocument->id();
        } catch (\Throwable $e) {
        }

    }

}
