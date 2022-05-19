<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['department_id', 'lead_id', 'name'];

    public function lead(){
        return $this->hasOne(User::class, 'id', 'lead_id');
    }

    public function department(){
        return $this->hasOne(Department::class, 'id', 'department_id');
    }
}