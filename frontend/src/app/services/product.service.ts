import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:5500/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, size: number = 10, sort: string = 'ASC', search: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort)
      .set('search', search);
    return this.http.get<any>(this.API_URL, { params });
  }

  addProduct(product: { name: string; price: number; category_id: number; image?: File }): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.category_id.toString());
    if (product.image) formData.append('image', product.image);
    return this.http.post<any>(this.API_URL, formData);
  }

  updateProduct(id: number, product: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.category_id.toString());
    if (product.image) formData.append('image', product.image);
    return this.http.put<any>(`${this.API_URL}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  bulkUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.API_URL}/bulk-upload`, formData);
  }

  downloadReport(): Observable<Blob> {
    return this.http.get(`${this.API_URL}/report`, { responseType: 'blob' });
  }
}
