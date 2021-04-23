<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class UserController extends Controller
{
    //Función encargada de registrar un nuevo usuario
    public function userRegister(Request $request)
    {

        //username, password, email
        $name = $request->input('name');
        $surname = $request->input('surname');
        $username = $request->input('username');
        $birthday = $request->input('birthday');
        $city = $request->input('city');
        $email = $request->input('email');
        $password = $request->input('password');
        

        //hasheo del password
        $password = Hash::make($password);

        try {
            return User::create([
                'name' => $name,
                'surname' => $surname,
                'username' => $username,
                'birthday'=> $birthday,
                'city'=> $city,
                'email' => $email,
                'password' => $password
                
            ]);
        } catch (QueryException $error) {
            $eCode = $error->errorInfo[1];

            if ($eCode == 1062) {
                return response()->json([
                    'error' => "Usuario ya registrado"
                ]);
            }
        }
    }
    //Funcion para el logueo de usuarios
    public function userLogin(Request $request)
    {

        $username = $request->input('username');
        $password = $request->input('password');

        try {
            $validate_player = User::select('password')
                ->where('username', 'LIKE', $username)
                ->first();

            if (!$validate_player) {
                return response()->json([
                    'error' => 'Username o password inválido'
                ]);
            }

            $hashed = $validate_player->password;

            //Comprobamos que el password corresponde con el username

            if (Hash::check($password, $hashed)) {

                //Si se corresponde generamos el token
                $length = 50;
                $token = bin2hex(random_bytes($length));

                //Guardamos el token en su campo correspondiente, esto es opcional si guardamos el token en la base de datos
                User::where('username', $username)
                    ->update(['token' => $token]);

                //devolvemos la informacion del player logueado
                return User::where('username', 'LIKE', $username)
                    ->get();
            } else {
                return response()->json([
                    'error' => 'Username o password incorrecto'
                ]);
            }
        } catch (QueryException $error) {
            return response()->$error;
        }
    }
}
