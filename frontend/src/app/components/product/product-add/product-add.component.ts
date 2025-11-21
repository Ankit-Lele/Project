import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent {
  name: string = '';
  price: number | null = null;
  category_id: number | null = null;
  image: File | null = null;
  file: File | null = null; // For bulk upload
  message: string = '';

  constructor(private productService: ProductService) {}

  onImageChange(event: any) {
    this.image = event.target.files[0];
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  addProduct() {
    if (!this.name || this.price === null || this.category_id === null) {
      this.message = 'Name, price, and category are required';
      return;
    }

    this.productService.addProduct({
      name: this.name,
      price: this.price,
      category_id: this.category_id,
      image: this.image || undefined
    }).subscribe({
      next: res => {
        this.message = 'Product added successfully';
        this.name = '';
        this.price = null;
        this.category_id = null;
        this.image = null;
      },
      error: err => this.message = 'Error: ' + err.error?.error || err.message
    });
  }

  bulkUpload() {
    if (!this.file) {
      this.message = 'Please select a file';
      return;
    }

    this.productService.bulkUpload(this.file).subscribe({
      next: res => {
        this.message = 'Bulk upload completed';
        this.file = null;
      },
      error: err => this.message = 'Error: ' + err.error?.error || err.message
    });
  }

  downloadReport() {
    this.productService.downloadReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products_report.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
