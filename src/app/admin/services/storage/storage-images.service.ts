import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
 
import { environment } from 'src/environments/environment';
import { Upload } from '../../models/upload.model';
import { FirestoreBaseService } from './base/firestore-base.service';
import { StorageFirestoreService } from './storage-firestore.service';
 
 
 
@Injectable({
  providedIn: 'root'
})
export class StorageImagesService extends FirestoreBaseService {

  constructor(protected override storage: AngularFireStorage ) {
    super(storage, `${environment.storage.DirectoryImage}`);

  }


  pushFileToStorage(dir:string , fileUpload: Upload): Observable<number | undefined> {
 
    const uploadTask = this.uploadFileTask(dir,fileUpload.name,  fileUpload.file );

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.getDownloadURL(dir,fileUpload.name).subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
 
}

 