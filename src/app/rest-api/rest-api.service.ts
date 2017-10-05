import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Request, RequestMethod, Jsonp, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestApiService {

  public url = 'http://zirka-template/rest/V1/';

  constructor(private jsonp: Jsonp, private http: Http) {
    console.log('RestApiService working');
  }

  /**
   *  return all categories.
   *  @returns {Observable<any>} JSON: [id, name, children_data[JSON]]
   */
  public getCategories() {
    return this.http.get(this.url + 'categories')
      .map(res => res.json());
  }

  /**
   * @returns {Observable<any>} JSON
   * items[id, sku, name, price, visibility, type_id, created_at, updated_at, weight,
   * custom_attributes[attribute_code, value]]
   */
  public getAllProducts() {
    return this.http.get(this.url + '/products?searchCriteria=""')
      .map(res => res.json());
  }

  /**
   * @param   {string} sku
   * @returns {Observable<any>}   product in json
   */
  public getProductById(sku: string) {
    return this.http.get(this.url + '/products/' + sku)
      .map(res => res.json());
  }

  /**
   * @param   {number} categoryId
   * @returns {Observable<any>} array of json {sku}
   */
  public getProductsInCategory(categoryId: number) {
    return this.http.get(this.url + '/categories/' + categoryId + '/products')
      .map(res => res.json());
  }

  /**
   * @param   {string}  sku of products
   * @returns {Observable<any>} array of child products in json
   */
  public getConfigPorductChild(sku: string) {
    return this.http.get(this.url + 'configurable-products/' + sku + '/children')
      .map(res => res.json());
  }

  /**
   * return auth token  for  user or guest
   * @param   {any} user: JSON {username, password}
   * @returns {Observable<any>} token in json
   */
  public postAdminAuth(user = null) {
    return this.http.post(this.url + 'integration/admin/token/', JSON.stringify(user), new RequestOptions())
      .map(res => res.json());
  }

  /**
   * @param   {any} user JSON {username, password}
   * @returns {Observable<any>} token in json
   */
  public postUserAuth(user = null) {
    if (user != null) {
      return this.http.post(this.url + 'integration/admin/token/', JSON.stringify(user), new RequestOptions())
        .map(res => res.json());
    } else {
      return this.http.post(this.url + 'integration/customer/token/', new RequestOptions())
        .map(res => res.json());
    }
  }

  /**
   * @returns {Observable<any>} cartId in json
   */
  public createGuestCart() {
    return this.http.post(this.url + 'guest-carts/', new RequestOptions())
      .map(res => res.json());
  }

  /**
   * @param   product JSON{sku, qty, quoteId}
   * @returns {Observable<any>} JSON with cart item
   */
  public addProductToCart(product: any) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'guest-carts/' + product.quoteId + '/items/', JSON.stringify(product), options)
      .map(res => res.json());
  }

  /**
   * @param   product JSON{itemId, quoteId}
   * @returns {boolean} true or false
   */
  public delProductFromCart(product: any) {
    return this.http.delete(this.url + 'guest-carts/' + product.quoteId + '/items/' + product.itemId)
      .map(res => res.json());
  }
}
