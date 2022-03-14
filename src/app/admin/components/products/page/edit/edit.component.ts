import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
 
 
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { UploadTask } from 'src/app/admin/models/upload.model';
import { StorageImagesService } from 'src/app/admin/services/storage/storage-images.service';
import { IBrand } from 'src/app/shared/models/ibrand.model';
import { ICategorie } from 'src/app/shared/models/icategorie.model';
import { IImage, IProduct } from 'src/app/shared/models/iproduct.model';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { CategorieService } from 'src/app/shared/services/categorie/categorie.service';
import { ProductService } from 'src/app/shared/services/product/product.service';


export interface IUpdateImage  {
  image ?    :IImage  ,
  file?:File,
  isDeleted? :boolean,
  isChanged? :boolean,
  isNew?:boolean,
  isFromProduct?:boolean,
  src?:string | ArrayBuffer | null,
  task?: AngularFireUploadTask;
  percentage?: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  data: IProduct; 
  Images     :IUpdateImage [] =[] ;
 
  uuid:string =""; 
  isLoaded:boolean =false; 

  public categories :  ICategorie[] = [];   
  public brands :  IBrand[] = [];   
  startIdxAddedFile=0;

  
   constructor( private route: ActivatedRoute, 
                public router: Router ,
                private HttpProduct: ProductService,
                public storage: StorageImagesService,
                private HttpBrand: BrandService,
                private HttpCategorie: CategorieService,
                private toastr: ToastrService ) 
    { }

ngOnInit(): void {

  this.loadCategories();
  this.loadBrands();
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.uuid = params.get('uuid');
    this.onLoad(this.uuid);
 })
}
 


 
loadCategories()
{
 this.HttpCategorie.GetAll().subscribe
 (
       (response)=>
       {
         this.categories = response; 
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

onLoad(uuid:string ) {
    this.HttpProduct.GetById(uuid) 
    .subscribe
    (   
        (response)=>
          {
            this.data = response ;
            this.isLoaded=true;
            if(!this.data.Images)
               this.data.Images =[];
            this.data.Images.forEach(elm=> {
                let image:IUpdateImage ={
                  isChanged:false,
                  isDeleted:false,
                  isFromProduct:true,
                  file:null,
                  image:elm
                };
                this.Images.push(image);
            })  
            
          },
        (errorReponse) =>
        {
            let errMsg: string;
            if (!navigator.onLine) {
              errMsg = "Check your internet connection and try again";
            }
            else if (errorReponse.error instanceof ErrorEvent) {
              errMsg =  `An error occurred:  +  ${errorReponse.error.message}`  ;
            } 
            else if(errorReponse.error instanceof ProgressEvent){
                errMsg =  `An error occurred:  +  ${errorReponse.message } message: ${errorReponse.statusText } ERR_CONNECTION_REFUSED`     ;
            }
            else {
              errMsg =`Backend returned code ${errorReponse.status}   message:  ${errorReponse.error}`
            }
              this.toastr.error(errMsg, "Error");
              console.log(errorReponse);
        }
    )
}


onFileSelected(event) {

  let file:File = event.target.files[0];

  if (file) {

    if(this.Images.length<6){
    
        var ext =  file.name.split('.').pop();
        this.startIdxAddedFile++;
        var name = this.data.uuid+"_Image_Edit_" + this.startIdxAddedFile +"."+ ext;
        let image:IUpdateImage ={
              file:file,
              isChanged:false,
              isNew:true,
              isDeleted:false,
              isFromProduct:false,
              image:{Url:"",Name: name },
          } 
        const reader = new FileReader();
        reader.onload = (e: any) => {
          image.src= (e.target.result);
          
        };
        reader.readAsDataURL(image.file);

        this.Images.push(image);
        
         console.log(this.Images )
    }
    else{
      this.toastr.error(" the max images in product must be less then 6 ", "error files ")
    }
  }

   
 
  

}
 

onDeleteImage( elm:IUpdateImage): void {
  try {

    let idx = this.Images.findIndex(x=> x.image.Name== elm.image.Name);
    console.log("upload image idx :" +idx );
    if(idx>=0){
      this.Images[idx].isDeleted=true; ;
      // this.Images.splice(idx,1);
      // console.log( this.Images );
    } 
    
    console.log(this.Images )
  }
  catch (error) {
    console.error("catch "  +error);
  }
}
saveProduct()
{
  this.HttpProduct.Update(this.data.uuid, this.data).subscribe( 
    res => {
              this.toastr.success("update product ID :"+ this.data.uuid  +" success", "update product")
              this.router.navigate(['admin/products'])  
          },
    err=> {
             this.toastr.success("error update product ID :"+ this.data.uuid  +" Error", "update Error")
         },
    () => console.log('update DONE!')   
    
    )

 }

  
 
submit() {
// emppty stuff
}
 
 
 


onUpdateImage(event: any, elm:IUpdateImage) {

  try {
   
    let idx = this.Images.findIndex(x=> x.image.Name== elm.image.Name);
   
    if(idx>=0){
      this.Images[idx].file= event.target.files[0];
      this.Images[idx].isChanged= true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.Images[idx].src= (e.target.result);
       
      };
      reader.readAsDataURL(this.Images[idx].file);
     
    } 

    console.log(this.Images )
  }
  catch (error) {
    console.error("catch "  +error);
  } 
}
 
 

UploadImages() {
 
  try {
    let counter=0;
    let counterDelete=0;
    let nbrToAddOrUpdate=0;
    let nbrToDeleted=0;

    this.Images.forEach(elm => 
    {
      if((elm.isDeleted ==true) && (elm.isFromProduct==true) ){
          nbrToDeleted++;
      }
 
      if((elm.isChanged==true || elm.isNew ==true) && (elm.isDeleted ==false)){
           nbrToAddOrUpdate++;
      }
    })

    if((nbrToAddOrUpdate ==0 ) && (nbrToDeleted==0)){
      this.toastr.info("no image to updating or to add or to delete   ", "uploading")
      this.router.navigate(['admin/products'])  
      return 
    }
     
     console.log("nbrToDelted "+ nbrToDeleted)
    console.log("nbrToAddOrUpdate "+ nbrToAddOrUpdate)

 
    this.Images.forEach(elm => 
      {
        console.log(elm);
        /**
         * if delete image 
         */
        if((elm.isDeleted ==true) && (elm.isFromProduct==true) ){
            console.log("delete image  "+elm  )
            counterDelete++;
            this.storage.deleteFileByUrl(elm.image.Url )
            .subscribe(
            resp=>{
              console.log(resp);
              let idx = this.data.Images.findIndex(x=> x.Name== elm.image.Name);
              if(idx){
                   this.data.Images.splice(idx,1);
              }
              if(counterDelete== nbrToDeleted){
                                
                console.log("save after delete image "+ counterDelete)
                this.saveProduct();
              }

              this.toastr.success("Deleting image :"+ elm.image.Name  +" success", "Deleting")
            },
            err=>{  

              let idx = this.data.Images.findIndex(x=> x.Name== elm.image.Name);
              if(idx){
                   this.data.Images.splice(idx,1);
              }
              if(counterDelete== nbrToDeleted){
                                
                console.log("save after delete image "+ counterDelete)
                this.saveProduct();
              }
              this.toastr.error("Error deleting image :"+ elm.image.Name  +"  " + err, "Error Deleting")
            })  
        } 
        /**
         * if add new elm or change image 
         */
         else if((elm.isChanged==true || elm.isNew ==true) && (elm.isDeleted ==false)){
            /**
             *  start update image
             */
            elm.task = this.storage.uploadFileTask(this.data.uuid,elm.image.Name,elm.file);
            elm.task.percentageChanges().subscribe(
                res => {
                elm.percentage = Math.round( res);
            })

            elm.task.snapshotChanges().pipe(
              tap(snap => 
                {
                  console.log( snap.state);
                  /**
                   *  if upload image is ok
                   */
                    if(snap.state ==='success')
                    {
                      /** 
                       * get url of image uploaded 
                       */
                      this.storage.getDownloadURL(this.data.uuid, elm.image.Name)
                      .subscribe(
                          res=>{
                              console.log( res);
                              counter++
                              elm.image.Url =  res ;
                              /**
                               *  if the image is new , or updated after add new image ,  so is to  push  
                               */
                               
                              if( elm.isNew === true )
                              {
                                this.data.Images.push(elm.image);
                              }
                              else{
                                /**
                                 * if the image is only updated ,  so is to  update  
                                 */
                                if( (elm.isChanged === true)  )
                                {
                                    let idx = this.data.Images.findIndex(x=> x.Name== elm.image.Name);
                                    if(idx){
                                        this.data.Images[idx].Url= elm.image.Url;
                                    }
                                }
                              }

                              this.toastr.success("uploading image :"+  elm.image.Name  +" success", "uploading")
                              if(counter== nbrToAddOrUpdate){
                                
                                console.log("save "+ counter)
                                this.saveProduct();
                              }
                                
                          },
                          err =>{
                            counter++
                            if(counter== nbrToAddOrUpdate){
                                
                              console.log("save "+ counter)
                              this.saveProduct();
                            }
                             this.toastr.error("uploading image :"+ elm.image.Name  +" Error", "Error uploading")
                          }); 
                    }
           
                })).subscribe()
              }
      }
    )
  }
  catch (error) {
    console.error(error);
    this.toastr.error(error , "uploading")
  }
}



















}