<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShiftSchedule;

class ShiftScheduleController extends Controller
{
    public function list(){
        return ShiftSchedule::all();
    }

    public function update(Request $request){
        if($request->id > 0){
            $schedule = ShiftSchedule::find($request->id);
            $schedule->update($request->all());
            $schedule->save();
        } else {
            $schedule = ShiftSchedule::create($request->all());
            $request->id = $schedule->id;
        }
        return ShiftSchedule::find($request->id);
    }

    public function delete(Request $request){
        return ShiftSchedule::find($request->id)->delete();
    }
}