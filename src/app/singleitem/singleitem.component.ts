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
  private magentoProduct: MagentoProduct;
  private productSku: any;
  private paramsSub: any;

  constructor(private activatedRoute: ActivatedRoute, private apiService: RestApiService) {
  }

  AddtoCart() {
    localStorage.setItem('item', 'id');
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => this.productSku = (params['productSku']));
    this.apiService.getProductById(this.productSku).subscribe(data => {
      console.log(data);
      this.magentoProduct = new MagentoProduct(data);
      console.log(this.magentoProduct);
    });
    console.log(this.productSku);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
