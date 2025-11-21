import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <h3>Add Category</h3>
      <input type="text" class="form-control" placeholder="Category Name" [(ngModel)]="name" />
      <button class="btn btn-primary mt-2" (click)="addCategory()">Add</button>
    </div>
  `
})
export class CategoryAddComponent {
  name: string = '';

  constructor(private categoryService: CategoryService) {}

  addCategory() {
    if (!this.name.trim()) {
      alert('Category name is required');
      return;
    }

    this.categoryService.addCategory({ name: this.name }).subscribe({
      next: () => {
        alert('Category added successfully');
        this.name = '';
      },
      error: (err) => {
        alert('Error: ' + err.error?.error || err.message);
      }
    });
  }
}
