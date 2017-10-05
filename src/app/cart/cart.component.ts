import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  checkItems() {
    if (localStorage.getItem('id') === null) {
      console.log('exist');
    }
  }
  ngOnInit() {
    this.checkItems();
  }

}
