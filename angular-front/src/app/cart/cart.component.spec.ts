// Function to update quantity
updateQuantity(item: any): void {
  this.cartItemService.updateCartItem(item.id, { quantity: item.quantity }).subscribe(
    () => {
      this.calculateTotal(); // Recalculate total after quantity change
    },
    (error: HttpErrorResponse) => {
      console.error('Error updating cart item quantity', error); // Handle errors
    }
  );
}
