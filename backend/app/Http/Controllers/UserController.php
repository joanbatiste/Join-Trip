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
            $validate_username = User::select('username')
                ->where('username', 'LIKE', $username)
                ->first();
            $validate_email = User::select('email')
                ->where('username', 'LIKE', $username)
                ->first();

            if($validate_username || $validate_email){
                return response()->json([
                    'error' => 'Username o email ya existen'
                ]);
            }
            return User::create([
                'name' => $name,
                'surname' => $surname,
                'username' => $username,
                'birthday' => $birthday,
                'city' => $city,
                'email' => $email,
                'password' => $password

            ]);
            
            
        } catch (QueryException $error) {
            return response()->$error;
        }
    }
    //Funcion para el logueo de usuarios
    public function userLogin(Request $request)
    {

        $username = $request->input('username');
        $password = $request->input('password');

        try {
            $validate_user = User::select('password')
                ->where('username', 'LIKE', $username)
                ->first();

            if (!$validate_user) {
                return response()->json([
                    'error' => 'Username o password inválido'
                ]);
            }

            $hashed = $validate_user->password;

            //Comprobamos que el password corresponde con el username

            if (Hash::check($password, $hashed)) {

                //Si se corresponde generamos el token
                $length = 50;
                $token = bin2hex(random_bytes($length));

                //Guardamos el token en su campo correspondiente, esto es opcional si guardamos el token en la base de datos
                User::where('username', $username)
                    ->update(['api_token' => $token]);

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
    //Funcion para actualizar datos de usuario
    public function userUpdate(Request $request, $id)
    {
        $user = $request->user();

        if ($user['id'] != $id) {
            return response()->json([
                'error' => "No estas autorizado a  modificar estos datos."
            ]);
        }

        try {
            $name = $request->input('name');
            $surname = $request->input('surname');
            $username = $request->input('username');
            $birthday = $request->input('birthday');
            $city = $request->input('city');
            $email = $request->input('email');
            $password = $request->input('password');

            $password = Hash::make($password);

            return User::find($id)->update([
                'name' => $name,
                'surname' => $surname,
                'username' => $username,
                'birthday' => $birthday,
                'city' => $city,
                'email' => $email,
                'password' => $password
            ]);
        } catch (QueryException $error) {
            return $error;
        }
    }
    //Funcion para desloguearse un usuario
    public function userLogout(Request $request, $id)
    {

        $user = $request->user();
        if ($user['id'] != $id) {
            return response()->json([
                'error' => "No puedes desloguearte."
            ]);
        }

        try {

            return User::where('id', '=', $id)
                ->update(['api_token' => '']);
        } catch (QueryException $error) {
            return $error;
        }
    }
    //Traer usuario por ID
    public function getUser(Request $request, $id)
    {
        // $user = $request->user();
        // if ($user['id'] != $id) {
        //     return response()->json([
        //         'error' => "No existen datos"
        //     ]);
        // }
        try {
            return User::find($id);
        } catch (QueryException $error) {
            return $error;
        }
    }
}
