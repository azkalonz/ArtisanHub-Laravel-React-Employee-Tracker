<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $departments = ['DIRECTORS AND MANAGERS', 'CUSTOMER SUPPORT', 'FINANCE', 'HR AND ADMIN', 'MARKETING AND SALES', 'MANUAL JOB DELIVERY', 'TRAINING AND CONTENT', 'COMPLIANCE SUPPORT', 'ONBOARDING SUPPORT', 'PROGRAMMATIC SUPPORT', 'POSTING SUPPORT', 'TECHNICAL SUPPORT', 'SOURCING', 'PRODUCT DESIGN', 'INFORMATION TECHNOLOGY', 'QUALITY ASSURANCE', 'SOFTWARE DEVELOPMENT'];

        $teams = ['COMPLIANCE SUPPORT', 'CORPORATE', 'CUSTOMER SUPPORT', 'DATA ANALYST', 'FINANCE', 'HUMAN RESOURCE AND ADMIN', 'INFORMATION TECHNOLOGY', 'INTERNAL SOURCING', 'IT BIZOPS TEAM', 'IT HELPDESK TEAM', 'IT OPERATIONS, HELPDESK TEAM', 'IT SYSOPS TEAM', 'MANUAL JOB DELIVERY', 'MARKETING AND SALES', 'ONBOARDING SUPPORT', 'OPERATIONS', 'OTHER SOFTWARE DEV.', 'POSTING SUPPORT', 'PRODUCT DESIGN', 'PROGRAMMATIC SUPPORT', 'QUALITY ASSURANCE', 'SOFTWARE DEV. TEAM 1', 'SOFTWARE DEV. TEAM 2', 'SOFTWARE DEVELOPMENT', 'TECHNICAL SUPPORT', 'TRAINING AND CONTENT', 'TRIAGE TEAM'];

        $shift_schedules = array(
            [ '09:00:00' , '18:00:00', 'Regular Employees' ],
            [ '21:00:00' , '06:00:00', 'Regular Employees' ],
            [ '15:00:00' , '24:00:00', 'Regular Employees' ],
            [ '18:00:00' , '03:00:00', 'Regular Employees' ]
        );

        $hybrid_schedule_teams = array(
            ['A','WILL HAVE TO WORK IN THE OFFICE EVERY MONDAY-TUESDAY AND 1ST AND 3RD WEDNESDAY OF THE MONTH/WEEK CYCLE.'],
            ['B', 'WILL HAVE TO WORK IN THE OFFICE EVERY THURSDAY-FRIDAY AND 2ND AND 4TH WEDNESDAY OF THE MONTH/WEEK CYCLE.'], 
            ['C','WILL HAVE TO WORK IN THE OFFICE DAILY. THEY ARE THE ONES CONSIDERED TO BE ON A FULL RTO.'], 
            ['D', 'ARE EMPLOYEES WHO WERE GIVEN PRIOR APPROVAL TO CONTINUE TELECOMMUTING DUE TO
            UNCOMMON REASONS/CONCERNS.']);

        $hazard_pays = array(
            ['1','Office 1', 50],
            ['2','Office 2', 100],
            ['3','Office 3', 125],
            ['4','Office 4', 150],
        );

        $pto = array(
            'Unplanned Leave',
            'Planned Leave'
        );

        \App\Models\User::create([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('test123!'),
            'first_name' => 'System',
            'last_name' => 'Admin',
            'role' => 'admin'
        ]);

        Log::channel("stderr")->info('Pending: Seeding departments...');
        foreach($departments as $key => $department){
            \App\Models\Department::create(array('name' => $department));
        }
        Log::channel("stderr")->info('Completed: Seeding departments...');

        Log::channel("stderr")->info('Pending: Seeding teams...');
        foreach($teams as $key => $team){
            \App\Models\Team::create(array('name' => $team));
        }
        Log::channel("stderr")->info('Completed: Seeding teams...');
        
        Log::channel("stderr")->info('Pending: Seeding shift schedules...');
        foreach($shift_schedules as $key => $shift_schedule){
            \App\Models\ShiftSchedule::create(
                array(
                    'from' => $shift_schedule[0],
                    'to' => $shift_schedule[1],
                    'description' => $shift_schedule[2]
                )
            );
        }
        Log::channel("stderr")->info('Completed: Seeding shift schedules...');

        Log::channel("stderr")->info('Pending: Seeding hybrid shift schedules...');
        foreach($hybrid_schedule_teams as $key => $hybrid_schedule_team){
            \App\Models\HybridScheduleTeam::create(
                array(
                    'name' => $hybrid_schedule_team[0],
                    'description' => $hybrid_schedule_team[1]
                )
            );
        }
        Log::channel("stderr")->info('Completed: Seeding hybrid shift schedules...');

        Log::channel("stderr")->info('Pending: Seeding hazard pays...');
        foreach($hazard_pays as $key => $hazard_pay){
            \App\Models\HazardPay::create(
                array(
                    'area' => $hazard_pay[0],
                    'location' => $hazard_pay[1],
                    'payment' => $hazard_pay[2]
                )
            );
        }
        Log::channel("stderr")->info('Completed: Seeding hazard pays...');

        Log::channel("stderr")->info('Pending: Seeding pto...');
        foreach($pto as $key => $p){
            \App\Models\PtoInfo::create(
                array(
                    'name' => $p,
                )
            );
        }
        Log::channel("stderr")->info('Completed: Seeding pto...');

    }
}