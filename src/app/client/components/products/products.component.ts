import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/shared/models/api/iproduct.model';
import {  IProductFilter } from 'src/app/shared/models/iproductFilter.model';
import { ProductService } from 'src/app/shared/services/api/product.service';
import { DiagFilterComponent,
DIAG_CONST_FILTRE_BRAND_ALL_VALUE, 
DIAG_CONST_FILTRE_CATEGORIE_ALL_VALUE } from './diag-filter/diag-filter.component';



const CONST_PAGE_SIZE=8;
const CONST_START_INDEX=0 ;
const CONST_END_INDEX=8 ;
const CONST_PAGE_SIZE_OPTION: number[] = [8, 12, 20, 24, 32];

export interface IPaginatorParam {
  length: number  ,    // length of display list of product 
  pageSize: number  ,  // displaying   cards each page
  pageSizeOptions: number[] ,
  startIndex:number , // start index  
  endIndex:number ,  // end index
  currentPageIndex:number ,  // page index
  currentpageSize:number ,  // page index
}
  
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // get child sideNav (drawer) to be able to toggel it 
  @ViewChild('paginator', { static: true }) public paginator!: MatPaginator;
  //  load page status 
  isloading:boolean =true;
  //  list of products from server  
  public productsList :  IProduct[] = [];   
  //  list of products to display it in HTML file
  public DisplayProducts :  IProduct[] = []; 
  //  list of filtered products  
  public FilteredProducts :  IProduct[] = []; 
  //  filter parametres  
  productFilter:IProductFilter = { Brand:DIAG_CONST_FILTRE_BRAND_ALL_VALUE, Categorie:DIAG_CONST_FILTRE_CATEGORIE_ALL_VALUE,Price:(2500),isReset:false };  
   
  defaultElevation = 2;
  raisedElevation = 8;

  paginatorParam:IPaginatorParam = { length:0, pageSize:CONST_PAGE_SIZE,pageSizeOptions: CONST_PAGE_SIZE_OPTION,
    startIndex: CONST_START_INDEX ,endIndex:CONST_END_INDEX,currentPageIndex:0 ,currentpageSize:CONST_PAGE_SIZE};
     

  //constructor object
  constructor(  
    public dialog: MatDialog , 
     private toastr: ToastrService,
    private productService: ProductService  ) {}



ngOnInit() {

 this.getProducts() ;

 

}

 

 /***************************************************
   *  get product from server API and initlai list product 
   ***************************************************/

 
  getProducts() {

    
    this.productService.GetAll().subscribe
    (    (response)=>
                      {
                        this.productsList = response 
                        this.paginatorParam.length = this.productsList.length;
                        this.paginatorParam.startIndex = CONST_START_INDEX;
                        this.paginatorParam.endIndex =   CONST_END_INDEX ;
                        this.FilteredProducts= this.productsList ; 
                        this.DisplayProducts = this.FilteredProducts.slice(this.paginatorParam.startIndex, this.paginatorParam.endIndex);
                        
                        this.isloading =false;
                      },
          (errorReponse) => 
                      {
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
                        this.isloading =false;

                      
                      },
          () =>  console.log("Processing Complete.")
    )
  }
 
  updatePaginatorParam(  ){
    this.paginatorParam.startIndex =    this.paginatorParam.currentPageIndex * this.paginatorParam.currentpageSize;
    this.paginatorParam.endIndex   =   this.paginatorParam.startIndex + this.paginatorParam.currentpageSize;

    if(this.paginatorParam.endIndex > this.paginatorParam.length){
      this.paginatorParam.endIndex = this.paginatorParam.length;
    }
  }



  OnPageChange(event: PageEvent){
    this.paginatorParam.currentPageIndex=event.pageIndex;
    this.paginatorParam.currentpageSize=event.pageSize;
    this.updatePaginatorParam();
    this.DisplayProducts = this.FilteredProducts.slice( this.paginatorParam.startIndex,  this.paginatorParam.endIndex);
  }
 

 applyFilter(_productFilter:IProductFilter)
 {
  
      this.productFilter=_productFilter;
    

      this.FilteredProducts= this.productsList;
      if( !this.productFilter.isReset)
      {
        if(this.productFilter.Brand !== DIAG_CONST_FILTRE_BRAND_ALL_VALUE){
            console.log( this.productFilter);
            this.FilteredProducts= this.FilteredProducts.filter(opt=> opt.Brand == this.productFilter.Brand);
        }
        if(this.productFilter.Categorie !==DIAG_CONST_FILTRE_CATEGORIE_ALL_VALUE){
            this.FilteredProducts= this.FilteredProducts.filter(opt=> opt.Categorie == this.productFilter.Categorie); 
        }
        if(this.productFilter.Price>0){
             this.FilteredProducts= this.FilteredProducts.filter(opt=> opt.Price <= this.productFilter.Price);
        }
    }
    this.paginatorParam.length = this.FilteredProducts.length;
    this.updatePaginatorParam( );
    this.DisplayProducts = this.FilteredProducts.slice( this.paginatorParam.startIndex,  this.paginatorParam.endIndex);
 
 }
 

 
 


openDialog(): void {
  const dialogRef = this.dialog.open(DiagFilterComponent,
     {width: '250px', data:  this.productFilter, position:{left :'25px'} }
  
  );

  dialogRef.afterClosed().subscribe(result => {
    this.productFilter= result;
    this.applyFilter(this.productFilter);

  });
  
}  


}
