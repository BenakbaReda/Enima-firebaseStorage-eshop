import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { DiagFilterComponent } from './diag-filter/diag-filter.component';
 
import { MatGridColsDirective } from 'src/app/shared/directives/grid-cols.directive';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MaterialElevatorDirective } from 'src/app/shared/directives/material-elevator.directive';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductCardComponent,
    DiagFilterComponent,
    MatGridColsDirective,
    MaterialElevatorDirective,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule,
    MaterialModule,
  ],
  
  exports:[
    ProductsComponent,
  ]
})
export class ProductsModule { }
