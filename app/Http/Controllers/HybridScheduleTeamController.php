<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HybridScheduleTeam;

class HybridScheduleTeamController extends Controller
{
    public function list(){
        return HybridScheduleTeam::all();
    }
}