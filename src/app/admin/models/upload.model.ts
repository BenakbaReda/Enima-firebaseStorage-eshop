import { AngularFireUploadTask } from "@angular/fire/compat/storage";
import { UploadTaskSnapshot } from "firebase/storage";
import { Observable } from "rxjs";

 
 
export class Upload {
 
  file: File;
  url: string;
  progress: number;
 
  name: string;
  src :string;
  isLoading:boolean;
  isLoaded:boolean;
  constructor(file: File) {
    this.file = file;
    this.isLoading=false;
    this.isLoaded=false;
    this.url= "";
    this.progress= 0;
    this.name= "";
    this.src="";
  }
}
 
export class UploadTask {
 
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  State: Observable<string>;

  percentageNbr: number=0;
  url:string ;
  file: File;
  name: string;
  constructor( file: File ) {
    this.file = file;

  }

 
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
  
  isPaused(snapshot) {
    return snapshot.state === 'paused'
  }

  isSuccess(snapshot) {
    return snapshot.state === 'success'
  }

  pause(): boolean
  {
      return this.task.pause();
  }
  cancel(): boolean
  {
     return this.task.cancel();
    
  }
  resume(): boolean
  {
     return this.task.resume();
    
  }
 
  getState(snapshot): string
  {
    return snapshot.state;
    
  }
}