<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Message extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('message', 1000);
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('tripId');
            $table->foreign('userId','fk_messages_users')
            ->on('users')
            ->references('id')
            ->onDelete('restrict');
            $table->foreign('tripId', 'fk_messages_trips')
            ->on('trips')
            ->references('id')
            ->onDelete('restrict');
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
        Schema::dropIfExists('messages');
    }
}
