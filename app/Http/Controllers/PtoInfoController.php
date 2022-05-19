<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PtoInfo;

class PtoInfoController extends Controller
{
    public function list(){
        return PtoInfo::all();
    }

    public function update(Request $request){
        if($request->id > 0){
            $pto = PtoInfo::find($request->id);
            $pto->update($request->all());
            $pto->save();
        } else {
            $pto = PtoInfo::create($request->all());
            $request->id = $pto->id;
        }
        return PtoInfo::find($request->id);
    }

    public function delete(Request $request){
        return PtoInfo::find($request->id)->delete();
    }
}