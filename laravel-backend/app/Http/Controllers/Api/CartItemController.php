<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
  
    public function index()
    {
        $userId = auth()->id(); 
        $cartItems = CartItem::where('user_id', $userId)->with('product')->get();
    
        return response()->json($cartItems); 
    }
    
    

    
    public function store(Request $request)
    {
       
    }

    public function updateCartItem(Request $request, CartItem $cartItem)
    {
    
    }

    
    public function checkout()
    {
    }

    public function destroy($id)
    {
}
}