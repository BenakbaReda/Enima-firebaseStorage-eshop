import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
 
import { StorageImagesService } from 'src/app/admin/services/storage/storage-images.service';
import { IImage, IProduct } from 'src/app/shared/models/api/iproduct.model';
import {  ProductService } from 'src/app/shared/services/api/product.service';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent implements OnInit {

  colorAdd = "accent";
  colorDetail = "accent";

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

 _onBackProduct() {
  this.router.navigate(['admin/products'])
  

}
/**
 * 
 * @param imageDTO 
 */
 onDeleteClick( ): void {
    try {
 
      if(this.data.Images.length>0){
        let PhotosUrl :IImage[] ;
        PhotosUrl=this.data.Images;
        let counter=0;
        PhotosUrl.forEach(elm=>
          {    
              this.storage.deleteFileByUrl(elm.Url )
              .subscribe(
              resp=>{
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
        })
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