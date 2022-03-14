import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/shared/models/ibrand.model';
import { ICategorie } from 'src/app/shared/models/icategorie.model';
import { IProductFilter, ISteperFilter } from 'src/app/shared/models/iproduct.model';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { CategorieService } from 'src/app/shared/services/categorie/categorie.service';


const DIAG_CONST_STEPPER_MIN=0 ;
const DIAG_CONST_STEPPER_MAX=10000 ;
const DIAG_CONST_STEPPER_TICK=10 ;
const DIAG_CONST_STEPPER_STEP=10 ;
const DIAG_CONST_STEPPER_VALUE=10000 ;
const DIAG_CONST_FILTRE_PRICE_VALUE=10000 ;
export const DIAG_CONST_FILTRE_ID_VALUE="NaN" ;
export const DIAG_CONST_FILTRE_CATEGORIE_ALL_VALUE="All Categories" ;
export const DIAG_CONST_FILTRE_BRAND_ALL_VALUE="All Brands" ;
const DIAG_CONST_FILTRE_RESET_YES=true ;
const DIAG_CONST_FILTRE_RESET_NO=false ;


@Component({
  selector: 'app-diag-filter',
  templateUrl: './diag-filter.component.html',
  styleUrls: ['./diag-filter.component.css']
})
export class DiagFilterComponent implements OnInit {


  public categories :  ICategorie[] = [];   
  public brands :  IBrand[] = [];   
   
  public  AllCategorie = { } as ICategorie ; 
  public  AllBrands = { } as IBrand ; 

  productFilter:IProductFilter = { Brand:(DIAG_CONST_FILTRE_BRAND_ALL_VALUE), 
                                   Categorie:(DIAG_CONST_FILTRE_CATEGORIE_ALL_VALUE),
                                   Price:(DIAG_CONST_FILTRE_PRICE_VALUE) ,
                                   isReset:DIAG_CONST_FILTRE_RESET_NO };  
  steperFilter:ISteperFilter = { min :DIAG_CONST_STEPPER_MIN, 
                                 max:DIAG_CONST_STEPPER_MAX,
                                 tickInterval:DIAG_CONST_STEPPER_TICK, 
                                 step:DIAG_CONST_STEPPER_STEP,
                                 value:DIAG_CONST_STEPPER_VALUE }; 

                                 
    constructor( 
    public dialogRef: MatDialogRef<DiagFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public DataToDiag: IProductFilter,  
    private toastr: ToastrService,
    private categoriesService:CategorieService,   
    private brandsService: BrandService) { }

  ngOnInit(): void {

    this.AllCategorie.uuid=DIAG_CONST_FILTRE_ID_VALUE;
    this.AllCategorie.Name=DIAG_CONST_FILTRE_CATEGORIE_ALL_VALUE;

    
    this.AllBrands.uuid=DIAG_CONST_FILTRE_ID_VALUE;
    this.AllBrands.Name=DIAG_CONST_FILTRE_BRAND_ALL_VALUE;

  
    this.initializeSelectionFilter();
      
  
  }

  
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  initializeSelectionFilter() {
    this.categoriesService.GetAll().subscribe
    (
          (response)=>
          {
            this.categories = response;
            this.categories.push(this.AllCategorie);
           
          
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

      this.brandsService.GetAll().subscribe
      (
            (response)=>
            {
              this.brands = response;
              this.brands.push(this.AllBrands);
              
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
  

  
  selectionChangeCategories(id:string)  
  {
  
    this.productFilter.Categorie=id;
   // console.log( this.productFilter);
  
  }

  
  selectionChangeBrands(id:string)  
  {
  
    this.productFilter.Brand=id;
   // console.log( this.productFilter);
    
  
  
  }


  updatePriceFilterValue(event) {
    this.productFilter.Price = event.value;
  }


  
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }


  resetFilter()
  {
      this.productFilter.Brand=DIAG_CONST_FILTRE_ID_VALUE;
      this.productFilter.Categorie=DIAG_CONST_FILTRE_ID_VALUE;
      this.productFilter.Price= DIAG_CONST_FILTRE_PRICE_VALUE 
      this.steperFilter.value=DIAG_CONST_FILTRE_PRICE_VALUE;
      this.productFilter.isReset=DIAG_CONST_FILTRE_RESET_YES; 
      this.dialogRef.close(this.productFilter);
  
  }
  
  FilterChanged(){
      this.productFilter.isReset=DIAG_CONST_FILTRE_RESET_NO; 
      this.dialogRef.close(this.productFilter);

  }
  

}
