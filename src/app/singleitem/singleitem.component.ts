import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestApiService} from '../rest-api/rest-api.service';
import {MagentoProduct} from '../classes/magentoProduct';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css'],
  providers: [RestApiService]
})

export class SingleitemComponent implements OnInit {
  public magentoProduct: MagentoProduct;
  public enable = false;
  private productSku: any;
  private paramsSub: any;

  constructor(private activatedRoute: ActivatedRoute, private apiService: RestApiService) {
    this.paramsSub = this.activatedRoute.params.subscribe(params => this.productSku = (params['productSku']));
    this.apiService.getProductById(this.productSku).subscribe(data => {
      this.magentoProduct = new MagentoProduct(data);
      this.enable = true;
    });

  }

  public addtoCartEvent() {
    if (localStorage.getItem('cartId') == null) {
      this.apiService.createGuestCart().subscribe(data => {
        if (data != null) {
          localStorage.setItem('cartId', data);
          this.addproductToCart();
        }
      });
    } else {
      this.addproductToCart();
    }
  }

  private addproductToCart() {
    const item = {
      sku: this.magentoProduct.sku,
      qty: 1,
      quoteId: localStorage.getItem('cartId')
    };
    this.apiService.addProductToCart(item);
    this.apiService.getCart(localStorage.getItem('cartId')).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
