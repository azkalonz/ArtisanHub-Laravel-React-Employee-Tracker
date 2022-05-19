<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = ['employee_id','time_in' ,'time_out', 'is_onsite', 'remarks', 'is_holiday', 'location'];

    public function employee(){
        return $this->hasOne(User::class, 'id', 'employee_id');
    }
}