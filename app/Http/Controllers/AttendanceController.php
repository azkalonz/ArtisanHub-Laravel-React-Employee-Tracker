<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AttendanceBonus;

class AttendanceController extends Controller
{
    public function listBonus(){
        return AttendanceBonus::all();
    }
}