import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { product } from 'app/Models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + '/products';
  constructor(private http : HttpClient) { }

  getProducts() : Observable<product[]>
  {
    return this.http.get<product[]>(this.apiUrl);
  }
}
