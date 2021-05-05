<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class TripController extends Controller
{
    //Crear un trip
    public function tripCreate(Request $request, $userId){
        
        $title = $request->input('title');
        $destination = $request->input('destination');
        $description = $request->input('description');
        $date = $request->input('date');
        $days = $request->input('days');
        $link = $request->input('link');
        $userid = $request->input('userId');

        if($userid != $userId){
            return response()->json([
                'error'=> 'No estas autorizado a crear este viaje'
            ]);
        }

        try{
            return Trip::create([
                'title' => $title,
                'destination' => $destination,
                'description' => $description,
                'date' => $date,
                'days' => $days,
                'link' => $link,
                'userId' => $userid
            ]);
        }catch(QueryException $error){
            $eCode = $error->errorInfo[1];
            if($eCode == 1062){
                return response()->json([
                    'error' => 'No se puede publicar tu viaje'
                ]);
            }
        }

    }

    //Traer todos los trips de un user
    public function findTripsByUserId($userid){
        try{
            return Trip::all()->where('userId', '=', $userid);
            
        }catch(QueryException $error){
            return $error;

        }
    }
    //Traer todos los trips 
    public function findAllTrips(){
        try{
            return Trip::select()
            ->join('users','trips.userId', '=','users.id')
            ->select('trips.*', 'users.username')
            ->get();
            
            

        }catch(QueryException $error){
            return $error;

        }
    }

    //Editar un trip creado
    public function tripUpdate(Request $request, $userid, $tripid){

        $trip = Trip::find($tripid);
        //Comprobamos que el trip existe
        if(!$trip){
            return response()->json([
                'error'=> 'El viaje no existe'
            ]);
        }
        //Comprobamos que el user es el propietario del trip
        if($trip['userId'] != $userid){
            return response()->json([
                'error'=> 'No estas autorizado a editar este viaje'
            ]);
        }
        //Intentamos editar el trip
        try{
            return $trip->update([
                'title'=>$request->title,
                'destination'=>$request->destination,
                'description'=>$request->description,
                'date' => $request->date,
                'days' => $request->days,
                'link'=>$request->link
            ]);
        }catch(QueryException $error){
            return $error;
        };

    }

    //Eliminar un Trip 
    public function deleteTrip(Request $request,$userid, $tripid){
        $trip = Trip::find($tripid);
        //Comprobamos que existe el trip
        if(!$trip){
            return response()->json([
                'error'=> 'El viaje no existe'
            ]);
        }
        //Comprobamos la identidad del creador
        if($trip['userId'] != $userid){
            return response()->json([
                'error'=> 'No estas autorizado a eliminar este viaje'
            ]);
        }
        try{
            return Trip::destroy([
                'id'=>$tripid,
            ]);
        }catch (QueryException $error){
            return $error;
        };
    }
}
