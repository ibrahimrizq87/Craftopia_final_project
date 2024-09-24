import { Component } from '@angular/core';
import { HomeContentComponent } from '../home-content/home-content.component';
import { BannerComponent } from '../banner/banner.component';
import { LatestProductsComponent } from '../latest-products/latest-products.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeComponent,
    HomeContentComponent,
    BannerComponent,
    LatestProductsComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
