import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
 

const routes: Routes = [

  { path:'', component: ClientComponent}, 
  {
    path: 'basket',
    loadChildren: () => import('./components/customer-basket/customer-basket.module').then(m => m.CustomerBasketModule)
  },

 
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
  },

  {
    path: 'checkout',
    loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
