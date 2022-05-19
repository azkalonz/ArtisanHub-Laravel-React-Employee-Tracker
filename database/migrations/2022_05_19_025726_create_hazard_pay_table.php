<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHazardPayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hazard_pays', function (Blueprint $table) {
            $table->id();
            $table->string('area')->nullable();
            $table->string('location')->nullable();
            $table->float('payment')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('hazard_pay', function (Blueprint $table) {
            //
        });
    }
}