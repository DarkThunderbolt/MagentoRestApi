import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api/rest-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ RestApiService ]
})
export class ProductsComponent implements OnInit {

  categories: any;
  products: any;
  constructor( private apiService: RestApiService ) { }

  getCategories() {
    this.apiService.getCategories()
    .subscribe( categories => {
      console.log(categories.children_data);
      this.categories = categories.children_data;
    });
  }
  getAllProducts() {
    this.apiService.getAllProducts()
    .subscribe( products => {
      console.log(products.items);
      this.products = products.items;
    });
  }
  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
  }

}
