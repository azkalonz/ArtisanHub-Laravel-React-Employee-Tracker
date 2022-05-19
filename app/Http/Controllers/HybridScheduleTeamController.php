<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HybridScheduleTeam;

class HybridScheduleTeamController extends Controller
{
    public function list(){
        return HybridScheduleTeam::all();
    }

    public function update(Request $request){
        if($request->id > 0){
            $hybrid = HybridScheduleTeam::find($request->id);
            $hybrid->update($request->all());
            $hybrid->save();
        } else {
            $hybrid = HybridScheduleTeam::create($request->all());
            $request->id = $hybrid->id;
        }
        return HybridScheduleTeam::find($request->id);
    }

    public function delete(Request $request){
        return HybridScheduleTeam::find($request->id)->delete();
    }
}