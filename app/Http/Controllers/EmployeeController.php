<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use \Auth;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function update(Request $request){
        if(Auth::user()->role != 'admin') return response()->json(['error' => 'Unauthorized.'], 401);
        
        if($request->id > 0){
            $user = User::with(['team', 'department', 'shiftSchedule', 'hybridScheduleTeam', 'attendances', 'bonus'])->find($request->id);
            $user->update($request->all());
            $user->save();
        } else {
            $new_user = $request->all();
            $new_user = array_merge($new_user, ['password' => Hash::make('p@ssw0rd')]);
            $user = User::create($new_user);
            $request->id = $user->id;
        }

        return User::with(['team', 'department', 'shiftSchedule', 'hybridScheduleTeam', 'attendances', 'bonus'])->find($request->id);
    }

    public function list(Request $request){
        $users = User::with(['team', 'team.lead', 'department', 'shiftSchedule', 'hybridScheduleTeam', 'attendances', 'bonus']);
        $users->where('role','!=', 'admin');
        if(isset($request->team_id_filter)){
            $users = $users->where('team_id', '=', $request->team_id_filter);
        }
        if(isset($request->department_id_filter)){
            $users = $users->where('department_id', $request->department_id_filter);
        }
        return $users->orderBy('id', 'DESC')->get();
    }

    public function delete(Request $request){
        if(Auth::user()->role != 'admin') return response()->json(['error' => 'Unauthorized.'], 401);
        return User::find($request->id)->delete();
    }

    public function listNames(){
        return User::where('role', 'team lead')->orderBy('first_name','ASC')->get(['id','first_name', 'last_name']);
    }
}