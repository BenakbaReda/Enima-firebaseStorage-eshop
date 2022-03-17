import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerBasketRoutingModule } from './customer-basket-routing.module';
import { CustomerBasketComponent } from './customer-basket.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerBasketComponent
  ],
  imports: [
    CommonModule,
    CustomerBasketRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerBasketModule { }
