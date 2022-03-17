import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutAdressComponent } from './checkout-adress/checkout-adress.component';
import { CheckoutComponent } from './checkout.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPayementComponent } from './checkout-payement/checkout-payement.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DeliveryModeComponent } from './delivery-mode/delivery-mode.component';


@NgModule({
  declarations: [
    CheckoutSuccessComponent,
    CheckoutReviewComponent,
    CheckoutPayementComponent,
    CheckoutDeliveryComponent,
    CheckoutAdressComponent,
    CheckoutComponent,
    DeliveryModeComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    MaterialModule,


  ]
})
export class CheckoutModule { }
