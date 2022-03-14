import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface IDbCrud<T> {
    GetAll(): AngularFirestoreCollection<T> ; 
    Add(uuid: string, data:  T): any ; 
    Update(uuid: string, data: T): Promise<void> ; 
    Delete(uuid: string): Promise<void> ; 
    GetById(uuid: string):Observable<any>
}
 