import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsNotFoundComponent } from './products-not-found/products-not-found.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path:'', component:ProductsComponent},
  { path:'notFound', component:ProductsNotFoundComponent},
  { path:'products', component:ProductsComponent},
  { path:'products/:uuid', component: ProductDetailComponent},
  { path: '**', redirectTo: 'notFound', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
