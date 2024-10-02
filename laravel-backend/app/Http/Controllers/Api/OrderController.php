<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\CartItem; // Ensure you import the CartItem model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
// use App\Http\Controllers\Api\OrderItem;
use App\Models\OrderItem;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())->with('orderItems')->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'total' => 'required|numeric|min:1',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get authenticated user
        $user = Auth::user();

        // Create the order
        $order = new Order();
        $order->user_id = $user->id;
        $order->phone = $request->input('phone');
        $order->address = $request->input('address');
        $order->total = $request->input('total');
        $order->payment_status = 'not_payed'; // Default status
        $order->save();

        // Create order items
        foreach ($request->input('items') as $item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['product_id'];
            $orderItem->quantity = $item['quantity'];
            $orderItem->save();
        }

        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    }    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($order);
    }

    public function update(Request $request, Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'phone' => 'sometimes|required|string|max:15',
            'address' => 'sometimes|required|string|max:255',
            'total' => 'sometimes|required|integer|min:1',
            'payment_status' => 'sometimes|required|in:payed,not_payed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order->update($request->only(['phone', 'address', 'total', 'payment_status']));

        return response()->json($order, 200);
    }

    public function destroy(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 204);
    }
}
