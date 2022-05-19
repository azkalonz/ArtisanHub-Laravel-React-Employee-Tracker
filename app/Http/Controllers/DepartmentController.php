<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function list(){
        return Department::all();
    }

    public function update(Request $request){
        if($request->id > 0){
            $department = Department::find($request->id);
            $department->update($request->all());
            $department->save();
        } else {
            $department = Department::create($request->all());
            $request->id = $department->id;
        }
        return Department::find($request->id);
    }

    public function delete(Request $request){
        return Department::find($request->id)->delete();
    }
}