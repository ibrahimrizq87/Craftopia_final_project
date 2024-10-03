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
       
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
             
            
        ]);

        $userId = auth()->id();
      
        $cartItem = CartItem::where('user_id', $userId)
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($cartItem) {
           
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
           
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Product added to cart successfully'], 201);
    }

    public function updateCartItem(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

    
        $cartItem->quantity = $request->input('quantity');
        $cartItem->save();

        return response()->json($cartItem, 200); 
    }

    
    public function checkout()
    {
    }

    public function destroy($id)
    {
}
}