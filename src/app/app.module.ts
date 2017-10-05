import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SingleitemComponent } from './singleitem/singleitem.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'single',
    component: SingleitemComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    ProductsComponent,
    SingleitemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [NavbarComponent]
})
export class AppModule { }
