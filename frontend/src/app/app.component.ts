import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { CategoryListComponent } from './components/product/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/product/category/category-add/category-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProductListComponent,
    ProductAddComponent,
    CategoryListComponent,
    CategoryAddComponent
  ],
  template: `
    <div class="container">
      <h1 class="mt-3">Product Management System</h1>
      
      <app-category-add></app-category-add>
      <app-category-list></app-category-list>
      <hr>
      
      <app-product-add></app-product-add>
      <app-product-list></app-product-list>
    </div>
  `
})
export class AppComponent {
  title = 'frontend';
}
