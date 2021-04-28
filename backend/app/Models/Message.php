<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'message',
        'userId',
        'tripId'
    ];

    public function users()
    {

        return $this->belongsTo('App\Models\User', 'userId', 'id');
    }
    public function trips()
    {

        return $this->belongsTo('App\Models\Trip', 'tripId', 'id');
    }
}
