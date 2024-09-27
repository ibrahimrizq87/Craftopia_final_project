// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { WishListService } from './services/wishlist.service';
import { ReviewService } from './services/review.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  providers: [
    CategoryService,
    ProductService,
    WishListService,
    ReviewService,
    UserService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-front';

  categories: any[] | null = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(response => {
      console.log(response);
      this.categories = response.data;
      this.categoryService.setAllCategory(this.categories);
    },
    error => {
      console.error('Error fetching categories:', error);
    });
  }
}
