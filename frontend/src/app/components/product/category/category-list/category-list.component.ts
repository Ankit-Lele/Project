import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h3>Category List</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let category of categories">
            <td>{{ category.id }}</td>
            <td>
              <input [(ngModel)]="category.name" class="form-control" />
            </td>
            <td>
              <button class="btn btn-success btn-sm me-1" (click)="updateCategory(category)">Update</button>
              <button class="btn btn-danger btn-sm" (click)="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => alert('Error: ' + err.error?.error || err.message)
    });
  }

  updateCategory(category: any) {
    this.categoryService.updateCategory(category.id, { name: category.name }).subscribe({
      next: () => alert('Category updated successfully'),
      error: (err) => alert('Error: ' + err.error?.error || err.message)
    });
  }

  deleteCategory(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully');
        this.loadCategories();
      },
      error: (err) => alert('Error: ' + err.error?.error || err.message)
    });
  }
}
