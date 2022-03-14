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
 


@NgModule({
  declarations: [
    ProductsComponent,
    DiagFilterComponent,
    ProductCardComponent,
    ProductDetailComponent,
    MaterialElevatorDirective,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule  
  ],
  exports:[
    ClientComponent,
  ]
})
export class ClientModule { }
