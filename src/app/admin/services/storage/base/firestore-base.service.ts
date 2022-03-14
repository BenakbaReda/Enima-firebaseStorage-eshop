import { Inject, Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
 
import { finalize, Observable, of, switchMap } from 'rxjs';
import { deleteObject, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';

const  STORE_FIREBASE_DIRECTORY = "Images/Products/"


export interface IUploadInfo   {
 
  file?:File,
  name?: string;
  percentage?: number;
  
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreBaseService {

  private basePath  = STORE_FIREBASE_DIRECTORY;
 
  constructor(protected storage: AngularFireStorage,
               @Inject(String) private _pathDirectory: string) { }

 
  uploadFileTask(dir:string, namefile:string , file:File):AngularFireUploadTask  {
    const filePath =  `${this.basePath}/${dir}/${namefile}`;
    return this.storage.upload(filePath, file);
  }

  getDownloadURL(dir:string ,namefile:string):Observable<string>   {

    const Path =  `${this.basePath}/${dir}/${namefile}`;
    const Ref = this.storage.ref(Path) 
    return  Ref.getDownloadURL()
  }

  deleteFileByUrl(url: string):Observable<any>
  {
     
    return this.storage.refFromURL(url).delete();
     
  }

 
  deleteFilesFromDir(dir:string)   {
    const Path =  `${this.basePath}/${dir}`;
    const Ref = this.storage.ref(Path) 
    Ref.listAll().subscribe(
      (res)=> {
        res.items.forEach((imageRef) => {
          imageRef.delete(); 
        });
      },
      err =>
      {

      }
      )
     
  };


  getFilesList(dir:string):Observable<ListResult>   {
    const Path =  `${this.basePath}/${dir}`;
    const Ref = this.storage.ref(Path) 
     return Ref.listAll() 
  };

  deleteFileByName(dir:string , namefile: string): Promise<void>
  {
     const Path = `${this.basePath}/${dir}/${namefile}`;
    
    const storage = getStorage();
    const storageRef = ref(storage, Path);

    return  deleteObject(storageRef)
     
  }


  isFileExists(dir:string , namefile: string): Promise<boolean> {
   
    const Path = `${this.basePath}/${dir}/${namefile}`;
    const storage = getStorage();
    const storageRef = ref(storage, Path);
   
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


 

  

}
