import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:5500/api/categories';

  constructor(private http: HttpClient) {}

  // ---------------- Get all categories ----------------
  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  // ---------------- Add a new category ----------------
  addCategory(category: { name: string }): Observable<any> {
    return this.http.post<any>(this.API_URL, category);
  }

  // ---------------- Update a category ----------------
  updateCategory(id: number, category: { name: string }): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, category);
  }

  // ---------------- Delete a category ----------------
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
