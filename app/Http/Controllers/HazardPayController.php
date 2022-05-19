<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HazardPay;
class HazardPayController extends Controller
{
    public function list(){
        return HazardPay::all();
    }
}