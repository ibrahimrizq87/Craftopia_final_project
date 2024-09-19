import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home parent/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { OrderComponent } from './components/order/order.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ReviewComponent } from './review/review.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path:"home",component:HomeComponent},
    {path:"products", component:ProductListComponent},
    {path:"product/3", component:ProductDetailsComponent},
    {path:"cart",component:CartComponent},
    {path:"payment",component:PaymentComponent},
    {path:"order",component:OrderComponent},
    {path:"category",component:CategoryComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},   
    {path:"contact",component:ContactComponent},
    {path:"add-product",component:AddProductComponent},
    {path:"update-product",component:UpdateProductComponent},
    {path:"review", component:ReviewComponent},
    {path:"**",component:ErrorComponent}
];

