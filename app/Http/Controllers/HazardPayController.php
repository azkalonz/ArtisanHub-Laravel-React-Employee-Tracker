<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HazardPay;
class HazardPayController extends Controller
{
    public function list(){
        return HazardPay::all();
    }

    public function update(Request $request){
        if($request->id > 0){
            $hazard_pay = HazardPay::find($request->id);
            $hazard_pay->update($request->all());
            $hazard_pay->save();
        } else {
            $hazard_pay = HazardPay::create($request->all());
            $request->id = $hazard_pay->id;
        }
        return HazardPay::find($request->id);
    }

    public function delete(Request $request){
        return HazardPay::find($request->id)->delete();
    }
}