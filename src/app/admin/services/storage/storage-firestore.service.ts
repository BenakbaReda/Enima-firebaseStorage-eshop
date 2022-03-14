import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { BehaviorSubject, finalize, forkJoin, from, Observable, of, switchMap, tap } from 'rxjs';
import { Upload } from '../../models/upload.model';
import { IStorage } from './base/istorage';
 
const  IMAGE_FIREBASE_DIRECTORY = "Images/Products/"

@Injectable({
  providedIn: 'root'
})
export class StorageFirestoreService   {//implements IStorage<Upload>{

  percentage: Observable<number>;
  private basePath  = IMAGE_FIREBASE_DIRECTORY;
 
  constructor(  protected storage: AngularFireStorage,
                @Inject(String) private _pathDirectory: string)
  {
    this.basePath=_pathDirectory;
  }
 
 


pushFileToStorage(dir:string , upload: Upload): Observable<number> {
    const filePath = `${this.basePath}/${dir}/${upload.name}`;
    const storageRef = this.storage.ref(filePath);
 
    const uploadTask = this.storage.upload(filePath, upload.file);

    uploadTask.snapshotChanges() .pipe(
      finalize(async () => {
        upload.url = await storageRef.getDownloadURL().toPromise();
        console.log('File available at',  upload.url);
      })
    ).subscribe();
 
    //   // finalize(() => {
    //   //   storageRef.getDownloadURL().subscribe(downloadURL => {
    //   //     console.log('File available at', downloadURL);
    //   //     upload.url = downloadURL;
         
    //   //   });
    //   // })
    // ).subscribe();

    return uploadTask.percentageChanges();
  }

  deleteFileByPath(pathname: string):Observable<any>
  {
    const filePath = `${this.basePath}/${pathname}`;

    const desertRef = this.storage.ref(filePath);
    return  desertRef.delete()  
  }

  deleteFileByName(dir:string ,  name: string):Observable<any> {
   
    const storageRef = this.storage.ref( `${this.basePath}/${dir}`);
    return storageRef.child(name).delete();
  }

  deleteFileByUrl(url: string):Observable<any>
  {
    return this.storage.refFromURL(url).delete();
  }
 
  checkIfFileExists(dir:string , upload: Upload): Promise<boolean> {
    const filePath = `${this.basePath}/${dir}/${upload.name}`;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
   
    return  getDownloadURL(storageRef)
      .then(url => {
        console.log( "file exist")
        return Promise.resolve(true);
      })
      .catch(error => {
        if (error.code === 'storage/object-not-found') {
          console.log( "object-not-found")
          return Promise.resolve(false);
        } else {
          console.log(error  )
          return Promise.reject(error);
        }
      });
  }

   
  
uploadFile(dir:string , upload: Upload):Observable<string>   {

   
    const filePath =  `${this.basePath}/${dir}/${upload.name}`;
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, upload.file);

    upload.isLoading= true;
    return task.percentageChanges().pipe(
      switchMap(progress => {
        upload.progress = Math.round(progress);
        if (progress == 100) {
          return fileRef.getDownloadURL()
        }
        return of(null)
      })
    )
 
}

getDownloadURL(dir:string , upload: Upload):Observable<string>   {

  const filePath =  `${this.basePath}/${dir}/${upload.name}`;
  const fileRef = this.storage.ref(filePath)
  return fileRef.getDownloadURL()
}

uploadFileTask(dir:string , upload: Upload):AngularFireUploadTask  {
  const filePath =  `${this.basePath}/${dir}/${upload.name}`;
  const fileRef = this.storage.ref(filePath)
  return this.storage.upload(filePath, upload.file);
}





}
 