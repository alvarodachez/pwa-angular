import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeShopService {
  API_URL: string = 'https://fakestoreapi.com/';

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(this.API_URL + 'products');
  }
}
