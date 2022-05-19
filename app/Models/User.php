<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'first_name',
        'last_name',
        'middle_name',
        'birthdate',
        'gender',
        'address',
        'mobile_number',
        'designation',
        'status',
        'employee_id',
        'team_id',
        'department_id',
        'shift_schedule_id',
        'hybrid_schedule_id',
        'attendance_bonus',
        'hazard_pay_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function department(){
        return $this->hasOne(Department::class, 'id', 'department_id');
    }

    public function team(){
        return $this->hasOne(Team::class, 'id', 'team_id');
    }

    public function hazardPay(){
        return $this->hasOne(HazardPay::class, 'id', 'hazard_pay_id');
    }

    public function shiftSchedule(){
        return $this->hasOne(ShiftSchedule::class, 'id', 'shift_schedule_id');
    }

    public function hybridScheduleTeam(){
        return $this->hasOne(HybridScheduleTeam::class, 'id', 'hybrid_schedule_id');
    }

    public function attendances(){
        return $this->hasMany(Attendance::class, 'employee_id', 'id');
    }
}