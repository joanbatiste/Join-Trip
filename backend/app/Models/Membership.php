<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'tripId'
    ];

    //Pertenencias de un usuario a un viaje.
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userId', 'id');
    }
    
    public function trip()
    {
        return $this->belongsTo('App\Models\Trip', 'tripid', 'id');
    }
}
