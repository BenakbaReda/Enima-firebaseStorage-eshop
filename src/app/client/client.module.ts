import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { MaterialModule } from '../shared/modules/material/material.module';
 
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiagFilterComponent } from './components/products/diag-filter/diag-filter.component';
import { MaterialElevatorDirective } from '../shared/directives/material-elevator.directive';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientComponent } from './components/client.component';
import { RouterModule } from '@angular/router';
import { CustomerBasketComponent } from './components/customer-basket/customer-basket.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutAdressComponent } from './components/checkout/checkout-adress/checkout-adress.component';
import { CheckoutDeliveryComponent } from './components/checkout/checkout-delivery/checkout-delivery.component';
import { CheckoutPayementComponent } from './components/checkout/checkout-payement/checkout-payement.component';
import { CheckoutReviewComponent } from './components/checkout/checkout-review/checkout-review.component';
import { CheckoutSuccessComponent } from './components/checkout/checkout-success/checkout-success.component';
import { ProductsModule } from './components/products/products.module';
import { CheckoutModule } from './components/checkout/checkout.module';
import { CustomerBasketModule } from './components/customer-basket/customer-basket.module';
import { OrdersModule } from './components/orders/orders.module';
 


@NgModule({
  declarations: [
    ClientComponent, 
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule ,
    ProductsModule,
    CheckoutModule,
    CustomerBasketModule, 
    OrdersModule,
  ],
  exports:[
    ClientComponent, 
  ]
})
export class ClientModule { }
