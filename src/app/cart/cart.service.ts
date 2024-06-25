import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from 'app/Models/product.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl + '/cart';
  constructor(private http: HttpClient) { }

  addToCart(product: product): Observable<product>
  {
    return this.http.post<product>(this.apiUrl,product)
  }

  getCartItems():Observable<product[]>
  {
    return this.http.get<product[]>(this.apiUrl);
  }

  clearCartItems(): Observable<void>
  {
    return this.http.delete<void>(this.apiUrl);
  }
}
