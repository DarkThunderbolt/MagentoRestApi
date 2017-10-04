import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Request, RequestMethod, Jsonp, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestApiService {

  public url = 'http://zirka.vn.ua/rest/V1/';

  constructor(private jsonp: Jsonp, private http: Http) {
    console.log('RestApiService working');
  }

  public getCategorys(): any {
    return this.http.get(this.url + 'V1/categories')
      .map(res => res.json());
  }

  public getAllProducts(): any {
    return this.http.get(this.url + '/products?searchCriteria=""')
      .map(res => res.json());
  }

  public getProductById(sku: string): any {
    return this.http.get(this.url + '/products/' + sku)
      .map(res => res.json());
  }

  public getProductByCategoryId(categoryId: number): any {

  }

  /// username,password -- return auth token  for  user or guest
  public postAdminAuth(user = null): any {
    return this.http.post(this.url + '/integration/admin/token', JSON.stringify(user), new RequestOptions())
      .map(res => res.json());
  }


  public postUserAuth(user = null): any {
    if (user != null) {
      return this.http.post(this.url + '/integration/admin/token', JSON.stringify(user), new RequestOptions())
        .map(res => res.json());
    } else {
      return this.http.post(this.url + '/integration/customer/token', new RequestOptions())
        .map(res => res.json());
    }
  }

  public createGuestCart() {
    return this.http.post(this.url + 'guest-carts', new RequestOptions())
      .map(res => res.json());
  }

  /// sku, qty, quoteId
  public addProductToCart(product) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url + '/guest-carts/' + product.sku + '/items', JSON.stringify(product), options)
      .map(res => res.json());
  }
}
