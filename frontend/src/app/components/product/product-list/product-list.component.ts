import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  search: string = '';
  page: number = 1;
  size: number = 10;
  totalPages: number = 1
  sort: string = 'ASC';
  selectedProduct: any = null;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data: any) => this.categories = data);
  }

  loadProducts() {
    this.productService.getProducts(this.page, this.size, this.sort, this.search).subscribe((res: any) => {
      this.products = res.data;
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure?')) return;
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  editProduct(product: any) {
    this.selectedProduct = { ...product };
  }
    loadMore() {
    if (this.page >= this.totalPages) return;
    this.page++;
    this.productService.getProducts(this.page, this.size, this.sort, this.search).subscribe({
      next: (res) => this.products.push(...res.data),
      error: (err) => console.error(err)
    });
  }


  updateProduct() {
    if (!this.selectedProduct) return;
    this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
      this.loadProducts();
      this.selectedProduct = null;
    });
  }
}
