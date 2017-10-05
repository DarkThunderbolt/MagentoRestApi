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
  constructor( private apiService: RestApiService ) { }

  getCategories() {
    this.apiService.getCategories()
    .subscribe( categories => {
      console.log(categories);
      // this.categories = categories;
    });
  }

  ngOnInit() {
    this.getCategories();
  }

}
