import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.component.html',
  styleUrls: ['./singleitem.component.css']
})
export class SingleitemComponent implements OnInit {

  constructor() { }
  AddtoCart() {
    localStorage.setItem('item', 'id');
  }
  ngOnInit() {
  }

}
