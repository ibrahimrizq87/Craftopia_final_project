<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    protected $fillable = [
        'payment_status', 'phone', 'address', 'total', 'error_message', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    // use HasFactory;


    // public function items()
    // {
    //     return $this->hasMany(OrderItem::class);
    // }
}
