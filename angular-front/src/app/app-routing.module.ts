import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component'; 

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/cart', pathMatch: 'full' } // Redirect to cart on load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
