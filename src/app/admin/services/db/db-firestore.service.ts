import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { IProductDTO } from 'src/app/shared/models/iproduct.model';
 
import { IDbCrud } from './base/idb-crud';

@Injectable({
  providedIn: 'root'
})
export class DbFirestoreService<T>   implements IDbCrud<T>{

  private dbLinkbase = '/Products';

  CollRef: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore,
              @Inject(String) private _Linkbase: string) 
  {
    this.dbLinkbase=_Linkbase;
    this.CollRef = db.collection(this.dbLinkbase);
   
  }
 

  GetAll(): AngularFirestoreCollection<T> {
    return this.CollRef;
  }
  
  GetById(uuid: string):  Observable<any> {
    return  this.CollRef.doc(uuid).get() 
   }

  Add(uuid: string, p: T): Promise<void> {
   
    return this.CollRef.doc(uuid).set({ ...p }) ;
  }
  
  Update(uuid: string, p: T): Promise<void> {
    return this.CollRef.doc(uuid).update(p);
  }
  
  Delete(uuid: string): Promise<void> {
    return this.CollRef.doc(uuid).delete();
  }
   
 
}
