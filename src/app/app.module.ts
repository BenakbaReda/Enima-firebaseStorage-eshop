import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { environment } from 'src/environments/environment';
import { BlockUIModule } from 'ng-block-ui';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
    ClientModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    BlockUIModule.forRoot(),
    ToastrModule.forRoot({
      maxOpened:10,
      timeOut: 2000,
      closeButton:true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
