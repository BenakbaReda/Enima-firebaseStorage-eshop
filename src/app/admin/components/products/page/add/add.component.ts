import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
 
import { ToastrService } from 'ngx-toastr';
import { delay, of, tap } from 'rxjs';
import { FilePickerDirective } from 'src/app/admin/directives/file-picker.directive';
import { IImage, IProduct } from 'src/app/shared/models/iproduct.model';
import { Upload, UploadTask } from 'src/app/admin/models/upload.model';
import { StorageImagesService } from 'src/app/admin/services/storage/storage-images.service';
import {  ProductService } from 'src/app/shared/services/product/product.service';
import * as uuid from 'uuid';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { CategorieService } from 'src/app/shared/services/categorie/categorie.service';
import { ICategorie } from 'src/app/shared/models/icategorie.model';
import { IBrand } from 'src/app/shared/models/ibrand.model';
import { FormControl, Validators } from '@angular/forms';
import { IUploadInfo } from 'src/app/admin/services/storage/base/firestore-base.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @BlockUI('dropzoneBlockui') blockUIdropzone: NgBlockUI;
  @ViewChild('dropZonePicker', { static: true })
  _dropZonePicker: FilePickerDirective;


  data: IProduct; 
  uploadOpList:UploadTask[] =[];
  _isStartUpload = false;

  public categories :  ICategorie[] = [];   
  categorieControl = new FormControl('', Validators.required);
  public brands :  IBrand[] = [];   
  brandControl = new FormControl('', Validators.required);
  
  constructor(
    public router: Router ,
    public storage: StorageImagesService,
    private HttpProduct: ProductService,
    private HttpBrand: BrandService,
    private HttpCategorie: CategorieService,
    
    private toastr: ToastrService ) 
    {
      
    }

  ngOnInit(): void {

    this.loadCategories();
    this.loadBrands()
    this.data =  { 
      uuid:uuid.v4() ,
      Categorie:"NaN",  
      Brand: "NaN",  
      Name:"name_"+uuid.v4(), 
      Decription: "your description", 
      Price :  100,
      Rating: 5,
      Stocks:100, 
      Images:[]
  }
  }

  

 
 loadCategories()
 {
  this.HttpCategorie.GetAll().subscribe
  (
        (response)=>
        {
          this.categories = response;
          this.data.Categorie= this.categories.length>0? this.categories[0].Name:"NaN";  
           
        },
        (errorReponse) =>  {
          let errMsg: string;
          if (!navigator.onLine) {
            errMsg = "Check your internet connection and try again";
          }
          else if (errorReponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errMsg =  `An error occurred:  +  ${errorReponse.error.message}`  ;
          } else if(errorReponse.error instanceof ProgressEvent){
              errMsg =  `An error occurred:  +  ${errorReponse.message } message: ${errorReponse.statusText } ERR_CONNECTION_REFUSED`     ;
          }
          else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errMsg =`Backend returned code ${errorReponse.status}   message:  ${errorReponse.error}`
          }
          this.toastr.error(errMsg, "Error");
          console.log(errorReponse);
        }
    )
 }

 loadBrands()
 {
  this.HttpBrand.GetAll().subscribe
  (
        (response)=>
        {
          this.brands = response;
          this.data.Brand= this.brands.length>0? this.brands[0].Name:"NaN"; 
        },
        (errorReponse) => {

          let errMsg: string;
          if (!navigator.onLine) {
            errMsg = "Check your internet connection and try again";
          }
          else if (errorReponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errMsg =  `An error occurred:  +  ${errorReponse.error.message}`  ;
          } else if(errorReponse.error instanceof ProgressEvent){
              errMsg =  `An error occurred:  +  ${errorReponse.message } message: ${errorReponse.statusText } ERR_CONNECTION_REFUSED`     ;
          }
          else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errMsg =`Backend returned code ${errorReponse.status}   message:  ${errorReponse.error}`
          }
          this.toastr.error(errMsg, "Error");
          console.log(errorReponse);
        }
    )
 }


  _onFilesChanged(files: FileList) {
    let idxName=0;

    this.uploadOpList = [];
    for (let i = 0; i < files.length; i++) {
     
      if (files[i].type.split('/')[0] !== 'image') {
         this.toastr.success("unsupported file type :"+ files[i].name  +"", "error type")
         console.error('unsupported file type');
      }
      else
      {
        const upload:UploadTask = new UploadTask(files[i]);
        idxName++;
        var ext =   files[i].name.split('.').pop();

        upload.name=this.data.uuid+"_Image_" + idxName +"."+ ext;
        this.uploadOpList.push(upload);
      }
    } 
  }

  _filesMax(message :string) {
    console.error(message);
    this.toastr.error(message, "filesMax");
  }


  _onReset() {
    
    this.uploadOpList = [];
 
  }

  _reset() {
    this._dropZonePicker.reset();

  }
  _save() {
    try {
      this.blockUIdropzone.stop();
      this._isStartUpload=false;
      this.HttpProduct.Add(this.data).subscribe( 
        res => {
          this.toastr.success("save product ID :"+ this.data.uuid  +" success", "save product")
          this.router.navigate(['admin/products'])
        },
        error =>{
          this.toastr.error("error save product ID :"+ this.data.uuid  +"  " + error, "Error")
        } 
      )
    }
    catch (error) {
      this.toastr.error("error save product ID :"+ this.data.uuid  +"  " + error, "Error")
      console.error(error);
    }
  }
 
    

  uploadAlltaskAndAdd() {
    this._isStartUpload=true;
    this.data.Images =[];
   
    try {
      if(this.uploadOpList.length>0){
          let counter=0;
          this.blockUIdropzone.start("start uploading ");
          this.uploadOpList.forEach(elm => {
            elm.task = this.storage.uploadFileTask(this.data.uuid,elm.name,elm.file);
            elm.percentage =  elm.task.percentageChanges();
            elm.percentage.subscribe(
              res => {
                elm.percentageNbr= Math.round( res);
              }
            )
            elm.snapshot   =  elm.task.snapshotChanges().pipe(
              tap(snap => {
                elm.State=of(elm.getState(snap));
                switch( elm.getState(snap))
                {
                  case 'success' :
                  {
                  
                    this.storage.getDownloadURL(this.data.uuid,elm.name)
                    .subscribe(
                                res=>{
                                      counter++
                                      elm.downloadURL = of(res);
                                      const image :IImage ={ Name:elm.name,  Url:res};
                                      this.data.Images.push(image);
                                      this.toastr.success("uploading image :"+ elm.name  +" success", "uploading")
                                      if(counter== this.uploadOpList.length){
                                        console.log("save "+ counter)
                                        this._save();
                                      }
                                },
                                err =>{
                                      this.toastr.error("uploading image :"+ elm.name  +" Error", "Error uploading")
                                }

                    ); 
                  }break; 
                  case 'running' :
                  {

                  // console.log("snap.bytesTransferred  : "+ snap.bytesTransferred +"/"+ snap.totalBytes )
                    
                  }break; 
                  case 'paused' :
                  {

                    console.log("uploading image :"+ elm.name  +" paused" );
                    this.toastr.info("uploading image :"+ elm.name  +" paused", "uploading state")
                  }break; 
                  case 'error' :
                  {
                    console.error("uploading image :"+ elm.name  +" Error" );
                    this.toastr.error("uploading image :"+ elm.name  +" Error", "uploading Error")
                  }break; 
                  
                  case 'canceled' :
                  {
                    console.log("uploading image :"+ elm.name  +" canceled" );
                    this.toastr.info("uploading image :"+ elm.name  +" canceled", "uploading canceled")
                  }break; 
                  
    
                }
                
              })
            ) ;
            elm.snapshot.subscribe();
          })
      }
      else{
        this._save();
      }
    }
    catch (error) {
      console.error(error);
      this.toastr.error(error , "uploading")
    }
  }

 


}
