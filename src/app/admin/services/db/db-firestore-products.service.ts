import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProductDTO } from 'src/app/shared/models/iproductFilter.model';
import { environment } from 'src/environments/environment';
import { DbFirestoreService } from './db-firestore.service';
 
 
 
 


@Injectable({
  providedIn: 'root'
})
export class DbFirestoreProductsService extends DbFirestoreService<IProductDTO> {

  constructor(protected override db: AngularFirestore) {
    super(db, `${environment.DbProductName}`);

  }
}
