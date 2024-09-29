export interface CartItem {
  
  id: number;
  product_id: number;
  quantity: number;
  stock: number;
  price: number;   // Add price if you need it
  product?: {
    name: string;
    image: string;
    price: number; // You can duplicate here if you want to access product data directly
  };
 
 
  
}
