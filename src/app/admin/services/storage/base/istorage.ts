import { AngularFireUploadTask } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";
 

export interface IStorage  {

 
uploadFileTask(dir:string, namefile:string , file:File):AngularFireUploadTask;
getDownloadURL(dir:string ,namefile:string):Observable<string>;
deleteFileByUrl(url: string):Observable<any>;
isFileExists(dir:string , namefile: string): Promise<boolean>; 
    
}
