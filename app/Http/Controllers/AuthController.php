<?php
namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest as AuthLoginRequest;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
   
        public function Login(LoginRequest $request)
    {
        $data = $request->validated();  // Automatically validated

        if (!Auth::attempt($data)) {
            return response([ 
                'message' => 'email or password  are wrong'
            ]);
        }
            $user = Auth::user();
            $token =$user->createToken('main')->plainTextToken;

            return response()->json([
                'user'=> $user,
                'token'=>$token
            ]);
        }
        

    // SignUp method
    public function SignUp(SignUpRequest $request)
    {
        $data= $request->validated();  // Automatically validated

        
            // Create a new user record
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']), // Make sure password is hashed
            ]);

            $token =$user->createToken('main')->plainTextToken;

            return response()->json([
                'user'=> $user,
                'token'=>$token
            ]);


           
    }

    // Logout method
    public function Logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('',204);
        
       
    }
}

