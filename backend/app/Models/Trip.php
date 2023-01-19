<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'destination',
        'description',
        'date',
        'days',
        'link',
        'userId'
    ];

    //Relacion de pertenencia de un trip a un usuario
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'userId','id');
    }

    //Relacion de propiedad de un trip de muchos messages
    public function messages()
    {
        return $this->hasMany('App\Models\Message', 'tripId');
    }
}
