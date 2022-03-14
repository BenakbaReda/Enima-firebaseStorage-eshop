import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AdddiagComponent } from './components/products/diag/adddiag/adddiag.component';
import { DeldiagComponent } from './components/products/diag/deldiag/deldiag.component';
import { EditdiagComponent } from './components/products/diag/editdiag/editdiag.component';
import { AddComponent } from './components/products/page/add/add.component';
import { DelComponent } from './components/products/page/del/del.component';
import { EditComponent } from './components/products/page/edit/edit.component';
import { UsersComponent } from './components/users/users.component';
 
import { MaterialModule } from '../shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UploadTableComponent } from './components/products/page/add/upload-table/upload-table.component';
import { FilePickerDirective } from './directives/file-picker.directive';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin.component';
import { BlockUIModule } from 'ng-block-ui';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';


@NgModule({
  declarations: [
    ProductsComponent,
    AdddiagComponent,
    DeldiagComponent,
    EditdiagComponent,
    AddComponent,
    DelComponent,
    EditComponent,
    UsersComponent,
    AdminComponent,
    UploadTableComponent,
    FilePickerDirective,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BlockUIModule.forRoot(),
    NgxMatFileInputModule,
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
