<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Database\QueryException;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    //Funcion para crear mensajes
    public function createMessage(Request $request, $userId)
    {
        $message = $request->input('message');
        $userid = $request->input('userId');
        $tripId = $request->input('tripId');

        if($userid != $userId){
            return response()->json([
                'error'=> 'No estas autorizado a crear este mensaje'
            ]);
        }
        try {
            return Message::create([
                'message' => $message,
                'userId' => $userid,
                'tripId' => $tripId
            ]);
        } catch(QueryException $error){
            $eCode = $error->errorInfo[1];
            if($eCode == 1062){
                return response()->json([
                    'error' => 'No se puede publicar tu mensaje'
                ]);
            }
        }
    }
    //Traer todos los mensajes de un user
    public function findMessagesByUserId($userid){

        try{
            return Message::all()->where('userId', '=', $userid);
            
        }catch(QueryException $error){
            return $error;

        }
    }

    //Editar un message creado
    public function messageUpdate(Request $request, $userid, $messageid){

        $message = Message::find($messageid);
        //Comprobamos que el message existe
        if(!$message){
            return response()->json([
                'error'=> 'El mensaje no existe'
            ]);
        }
        //Comprobamos que el user es el propietario del message
        if($message['userId'] != $userid){
            return response()->json([
                'error'=> 'No estas autorizado a editar este mensaje'
            ]);
        }
        //Intentamos editar el message
        try{
            return $message->update([
                'message' => $request->message,
                "edited" => true
                
            ]);
        }catch(QueryException $error){
            return $error;
        };

    }
    //Borrar messages
    public function messageDelete(Request $request, $userid, $messageid)
    {
        
        $message = Message::find($messageid);
        //Comprobamos que el message existe
        if(!$message){
            return response()->json([
                'error'=> 'El mensaje no existe'
            ]);
        }
        //Comprobamos que el user es el propietario del message
        if($message['userId'] != $userid){
            return response()->json([
                'error'=> 'No estas autorizado a eliminar este mensaje'
            ]);
        }
        //Intentamos borrar el message
        try{
            return Message::destroy([
                'messageid' => $messageid,
               
            ]);
        }catch(QueryException $error){
            return $error;
        };
    }

}
