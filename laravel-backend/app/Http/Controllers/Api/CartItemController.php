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
        $userId = auth()->id();
        $cartItems = CartItem::where('user_id', $userId)->get();

        
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        
        foreach ($cartItems as $cartItem) {
            OrderItem::create([
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->price, 
                
            ]);

           
            $cartItem->delete();
        }

        return response()->json(['message' => 'Order placed successfully'], 200);
    }

    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return response()->json(null, 204);
}
}