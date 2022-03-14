import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
 
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
 
  { path:'', component: NotFoundComponent},
  { path:'not-found', component: NotFoundComponent},
  { path:'home', component: HomeComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  
 
  { path: '**', redirectTo: 'client', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
