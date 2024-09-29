<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    // Get all cart items for the logged-in user
    public function index()
    {
        try {
            $user = Auth::user(); // Get the authenticated user
            $cartItems = CartItem::with('product')->where('user_id', $user->id)->get(); // Eager load related products
            return response()->json($cartItems, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Add item to cart
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();

        // Check if the item already exists in the cart
        $existingCartItem = CartItem::where('user_id', $user->id)
                                    ->where('product_id', $request->product_id)
                                    ->first();

        if ($existingCartItem) {
            // Update the quantity if the item already exists
            $existingCartItem->quantity += $request->quantity;
            $existingCartItem->save();
        } else {
            // Create a new cart item
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json(['message' => 'Item added to cart'], 201);
    }

    // Remove item from cart
    public function destroy(CartItem $cartItem)
    {
        $user = Auth::user();

        // Check if the cart item belongs to the authenticated user
        if ($cartItem->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart'], 200);
    }
}
