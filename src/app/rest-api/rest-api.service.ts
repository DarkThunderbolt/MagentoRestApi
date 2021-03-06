import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Request, RequestMethod, Jsonp, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestApiService {


  private static readonly baseUrl = 'http://zirka-template/';
  public static readonly apiUrl = RestApiService.baseUrl + 'rest/V1/';
  public static readonly mediaUrl = RestApiService.baseUrl + 'pub/media/catalog/product/';

  constructor(private jsonp: Jsonp, private http: Http) {
    console.log('RestApiService working');
  }

  /**
   *  return all categories.
   *  @returns {Observable<any>} JSON: [id, name, children_data[JSON]]
   */
  public getCategories() {
    return this.http.get(RestApiService.apiUrl + 'categories/')
      .map(res => res.json());
  }

  /**
   * @returns {Observable<any>} JSON
   * items[id, sku, name, price, visibility, type_id, created_at, updated_at, weight,
   * custom_attributes[attribute_code, value]]
   */
  public getAllProducts() {
    return this.http.get(RestApiService.apiUrl + 'products?searchCriteria=""/')
      .map(res => res.json());
  }

  /**
   * @param   {string} sku
   * @returns {Observable<any>}   product in json
   */
  public getProductById(sku: string) {
    return this.http.get(RestApiService.apiUrl + 'products/' + sku)
      .map(res => res.json());
  }

  /**
   * @param   {number} categoryId
   * @returns {Observable<any>} array of json {sku}
   */
  public getProductsInCategory(categoryId: number) {
    return this.http.get(RestApiService.apiUrl + 'categories/' + categoryId + '/products/')
      .map(res => res.json());
  }

  /**
   * @param   {string}  sku of products
   * @returns {Observable<any>} array of child products in json
   */
  public getConfigPorductChild(sku: string) {
    return this.http.get(RestApiService.apiUrl + 'configurable-products/' + sku + '/children/')
      .map(res => res.json());
  }

  /**
   * return auth token  for  user or guest
   * @param   {any} user: JSON {username, password}
   * @returns {Observable<any>} token in json
   */
  public postAdminAuth(user = null) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(RestApiService.apiUrl + 'integration/admin/token/', JSON.stringify(user), options)
      .map(res => res.json());
  }

  /**
   * @param   {any} user JSON {username, password}
   * @returns {Observable<any>} token in json
   */
  public postUserAuth(user = null) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    if (user != null) {
      return this.http.post(RestApiService.apiUrl + 'integration/admin/token/', JSON.stringify(user), options)
        .map(res => res.json());
    } else {
      return this.http.post(RestApiService.apiUrl + 'integration/customer/token/', options)
        .map(res => res.json());
    }
  }

  /**
   * @param   {string} attrCode
   * @returns {Observable<any>} JSon{options[label, value]}
   */
  public getAttribute(attrCode: string) {
    return this.http.get(RestApiService.apiUrl + 'products/attributes/' + attrCode)
      .map(res => res.json());
  }

  /**
   * @returns {Observable<any>} cartId in json
   */
  public createGuestCart() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(RestApiService.apiUrl + 'guest-carts/', options)
      .map(res => res.json());
  }

  /**
   * @param   {string} cartId
   * @returns {Observable<any>} array of json{item_id, sku, qty, name, price, product_type, quote_id}
   */
  public getCart(cartId: string) {
    return this.http.get(RestApiService.apiUrl + 'guest-carts/' + cartId + '/items/')
      .map(res => res.json());
  }

  /**
   * @param   product JSON{sku, qty, quoteId}
   * @returns {Observable<any>} JSON with cart item
   */
  public addProductToCart(product: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: headers});
    return this.http.post(RestApiService.apiUrl + 'guest-carts/' + product.quoteId + '/items/', JSON.stringify(product), options)
      .map(res => res.json());
  }

  /**
   * @param   product JSON {itemId, quoteId}
   * @returns {boolean} true or false
   */
  public delProductFromCart(product: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(RestApiService.apiUrl + 'guest-carts/' + product.quoteId + '/items/' + product.itemId, options)
      .map(res => res.json());
  }
}
