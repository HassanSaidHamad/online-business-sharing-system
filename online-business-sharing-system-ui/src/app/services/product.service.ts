import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public createProduct(formData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(
      `${this.apiUrl}/api/products/create`,
      formData
    );
  }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/api/products/all`);
  }

  public getTotalProducts(): Observable<number> {
    return this.httpClient.get<number>(
      `${this.apiUrl}/api/products/total-products`
    );
  }

  public updateProduct(
    formData: FormData,
    productId: number
  ): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.apiUrl}/api/products/update/${productId}`,
      formData
    );
  }

  public findProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${this.apiUrl}/api/products/${productId}`
    );
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/products/delete/${productId}`
    );
  }

  public createProductFormData(product: Product, productImage: File): FormData {
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('productDescription', product.productDescription);
    formData.append('price', product.price);
    formData.append('productImage', productImage);

    return formData;
  }
}
