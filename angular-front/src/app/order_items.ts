export interface OrderDetails {
  quantity: any;
  id: number;
  created_at: string;
  payment_status: string;
  phone: string;
  address: string;
  order_items: Array<{
    quantity: number;
    product: {
      name: string;
      description: string;
      stock: number;
      price: number;
    };
  }>;
}
  export interface Order {
    customer: {
      phone: number;
      address: string;
    };
    paymentMethod: number;
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    product: {
      name: string;
      imageUrl: string;
      price: number;
    };
    quantity: number;
  }
  

