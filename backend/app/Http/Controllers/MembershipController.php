<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    //función para sumarse a un trip
    public function joinTrip(Request $request){

        $userId = $request->input('userId');
        $tripId = $request->input('tripId');

        try {

            return Membership::create([
                'userId' => $userId,
                'tripId' => $tripId
            ]);
    
        } catch (QueryException $error) {
            
            $eCode = $error->errorInfo[1];
    
            if($eCode == 1062) {
                return response()->json([
                    'error' => "No te has podido unir al viaje"
                ]);
            }
    
        }
    }
    //Función para salirse de un viaje
    public function cancelTrip(Request $request){

        $userId = $request->input('userId');
        $tripId = $request->input('tripId');

        try {

            return Membership::destroy([
                'userId' => $userId,
                'tripId' => $tripId
            ]);
    
        } catch (QueryException $error) {
            
            $eCode = $error->errorInfo[1];
    
            if($eCode == 1062) {
                return response()->json([
                    'error' => "No has podido salirte del viaje"
                ]);
            }
    
        }
    }
    //funcion para obtener los usuarios unidos a un trip por idTrip
    public function findJoinedByTrip($tripId){
        try{
            return Membership::select()
            ->where('tripId', '=', $tripId)
            ->join('users','memberships.userId','=','users.id')
            ->select('users.username')
            ->get();
            
            

        }catch(QueryException $error){
            return $error;

        }
    }

    //Funcion para obtener los trips a los que se ha unido un usuario
    public function findJoinedByUser($userId){
        try{
            return Membership::select()
            ->where('userId', '=', $userId)
            // ->join('trips','memberships.tripId','=','trips.id')
            // ->select('trips.*')
            ->get();
            
            

        }catch(QueryException $error){
            return $error;

        }
    }
}
