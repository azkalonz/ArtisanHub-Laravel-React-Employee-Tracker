<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShiftSchedule;

class ShiftScheduleController extends Controller
{
    public function list(){
        return ShiftSchedule::all();
    }
}