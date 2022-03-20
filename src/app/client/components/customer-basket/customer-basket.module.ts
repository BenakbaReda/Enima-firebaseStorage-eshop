import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import { CustomerBasketComponent } from './customer-basket.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerBasketComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CustomerBasketComponent
  ]
})
export class CustomerBasketModule { }
