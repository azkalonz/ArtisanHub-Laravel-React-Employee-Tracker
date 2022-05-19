<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AttendanceBonus;
use App\Models\AttendanceAudit;
use App\Models\Attendance;
use \Auth;

class AttendanceController extends Controller
{
    public function listBonus(){
        return AttendanceBonus::all();
    }

    public function list(Request $request){
        $attendance = Attendance::with(['employee', 'employee.team', 'employee.department', 'employee.shiftSchedule', 'employee.hybridScheduleTeam']);
        if(isset($request->month)){
            $attendance = $attendance->whereRaw('MONTH(created_at) = '.$request->month);
        }
        return $attendance->get();
    }

    public function export(){
        $attendance = Attendance::with(['employee', 'employee.team', 'employee.department', 'employee.shiftSchedule', 'employee.hybridScheduleTeam'])->get();
        $arr = [['Department', 'Employee Name', 'Shift Schedule', 'Team', 'Work Type', 'Remarks', 'Location']];

        foreach($attendance as $key => $value){
            $department = '';
            $shift = '';
            $team = '';
            $work_type = $value['is_onsite']?'Onsite':'WFH';
            $remarks = $value['remarks'];
            $location = $value['location'];
            $employee = $value['employee']['first_name'].' '.$value['employee']['last_name'];
            if($value['employee']['department'] != null)
                $department = $value['employee']['department']['name'];
            if($value['employee']['team'] != null)
                $team = $value['employee']['team']['name'];
            if($value['employee']['shift_schedule'] != null)
                $shift = $value['employee']['shift_schedule']['from']. ' - '. $value['employee']['shift_schedule']['to'];
            array_push($arr, [$department, $employee, $team, $work_type, $remarks, $location]);
        }
        return $arr;
    }

    public function updateBonus(Request $request){
        if($request->id > 0){
            $bonus = AttendanceBonus::find($request->id);
            $bonus->update($request->all());
            $bonus->save();
        } else {
            $bonus = AttendanceBonus::create($request->all());
            $request->id = $bonus->id;
        }
        return AttendanceBonus::find($request->id);
    }

    public function deleteBonus(Request $request){
        return AttendanceBonus::find($request->id)->delete();
    }

    public function checkSubmission(Request $request){
        return AttendanceAudit::where('date_recorded',date('Y-m-d'))->where('lead_id', Auth::user()->id)->first();
    }

    public function submitAttendanceReport(Request $request){
        foreach($request->employees as $key => $employee){
            $attendance = $employee['attendance'];
            Attendance::create($attendance);
        }
        return AttendanceAudit::create([
            'date_recorded' => date('Y-m-d'),
            'lead_id' => Auth::user()->id
        ]);
    }
}