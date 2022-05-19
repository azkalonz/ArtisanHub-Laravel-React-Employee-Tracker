<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function list(){
        return Team::with(['department', 'lead'])->get();
    }

    public function update(Request $request){
        if($request->id > 0){
            $team = Team::find($request->id);
            $team->update($request->all());
            $team->save();
        } else {
            $team = Team::create($request->all());
            $request->id = $team->id;
        }
        return Team::with(['department', 'lead'])->find($request->id);
    }

    public function delete(Request $request){
        return Team::find($request->id)->delete();
    }
}