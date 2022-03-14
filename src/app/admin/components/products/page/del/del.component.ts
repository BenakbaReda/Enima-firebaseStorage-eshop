import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { IImage, IProduct } from 'src/app/shared/models/iproduct.model';
import { StorageImagesService } from 'src/app/admin/services/storage/storage-images.service';
import {  ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent implements OnInit {

  data: IProduct; 
  uuid:string =""; 
  isLoaded:boolean =false; 
   constructor( private route: ActivatedRoute, 
                public router: Router ,
                private HttpProduct: ProductService,
                public storage: StorageImagesService,
                private toastr: ToastrService ) 
    { }

ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.uuid = params.get('uuid');
    this.onLoad(this.uuid);
 })
}
 
onLoad(uuid:string ) {
    this.HttpProduct.GetById(uuid) 
    .subscribe
    (   
        (response)=>
          {
             this.data = response ;
             this.isLoaded=true;
             if( !this.data.Images)
                this.data.Images =[];
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


  
 
submit() {
// emppty stuff
}
 
deleteProduct()
{
  this.HttpProduct.Delete(this.data.uuid).subscribe( 
    res => {
              this.toastr.success("Delete product ID :"+ this.data.uuid  +" success", "Delete product")
              this.router.navigate(['admin/products'])  
          },
    err=> {
             this.toastr.success("error Delete product ID :"+ this.data.uuid  +" Error", "Delete Error")
         },
    () => console.log('DONE!')   
    
    )

 }


 isUseDeleteFromList=false;
/**
 * 
 * @param imageDTO 
 */
 onDeleteClick( ): void {
    try {
 
      if(this.data.Images){
        let PhotosUrl :IImage[] ;
        PhotosUrl=this.data.Images;
       
        if(this.isUseDeleteFromList){ 
          /**
           *  this methode offer somme error in some senario 
           * to be performed 
           */
        this.storage.getFilesList(this.data.uuid )  
        .subscribe(
          (res)=> {
            let itmNbr=  res.items.length;
            let  counter=0; 
            res.items.forEach((imageRef) => 
            {
               console.log(imageRef.name);
               counter++;
               imageRef.delete()
                .then(()=> {
                      this.toastr.success("Deleting image :"+ imageRef.name  +" success", "Deleting")

                      if(counter ==itmNbr )
                      {
                        this.deleteProduct();
                      }
                 })
                .catch( (error) => {
                  console.log(error);
                  this.toastr.error(" catch Error deleting product :"+ this.data.uuid +"  " + error, "Catch Error Deleting")
                });
              
            })
          },
          err =>
          {
            
            this.toastr.error("Error deleting product :"+ this.data.uuid +"  " + err, "subscribe Error Deleting")
          }

         )
        }
        else{
            let counter=0;
            PhotosUrl.forEach(elm=>
              {    
                 this.storage.deleteFileByUrl(elm.Url )
                 .subscribe(
                  resp=>{
                   // console.log(resp);
                    counter++;
                    this.toastr.success("Deleting image :"+ elm.Name  +" success", "Deleting")
                    if(counter === PhotosUrl.length)
                    {
                      this.deleteProduct();
                    }
                  },
                  err=>{  
                    
                    this.toastr.error("Error deleting image :"+ elm.Name  +"  " + err, "subscribe Error Deleting")
                    counter++; 
                    if(counter === PhotosUrl.length)
                    {
                      this.deleteProduct();
                    } 
                  })  
            } 

            )
          }
      }
      else
      {
        this.deleteProduct();
      }

      
    }
    catch (error) {
      console.error("catch "  +error);
    }
 
}

}