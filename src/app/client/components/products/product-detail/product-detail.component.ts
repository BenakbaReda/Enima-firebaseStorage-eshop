import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CustomerBasketService } from 'src/app/client/services/customer-basket.service';
import { IShopingBasket } from 'src/app/shared/models/api/Basket.model';
import { IProduct } from 'src/app/shared/models/api/iproduct.model';
 
import { ProductService } from 'src/app/shared/services/api/product.service';
import { getRandomAnimation } from 'src/app/_helper/helper';




export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('1000ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('400ms', style({ opacity: 0 })),
      { optional: true}
    )
  ])
]);


const cardAnimation = trigger('cardAnimation', 
[
  // Transition from any state to any state
  transition('* => *', 
  [
    // Initially the all cards are not visible
    query(':enter', style({ opacity: 0 }), { optional: true }),

    // Each card will appear sequentially with the delay of 300ms
    query(':enter', stagger('200ms', 
    [
     animate('.2s ease-in', keyframes(
     [
        style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
        style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
      ]))
      ]), { optional: true }),

 
  ]),
] );

 












@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  Mydataaos:string ='zoom-in-down';
  selectedAnimation='fade';
   //  load page status 
  isloading:boolean =true;
  product:IProduct ; 
  uuid: string;
  quantity = 1;
  O_customerBasket$: Observable<IShopingBasket>;
  quantityBasket =0;


  constructor(private route: ActivatedRoute,private router: Router, 
    private S_customerBasket:CustomerBasketService , 
    private toastr: ToastrService,
    private productService:  ProductService) {  }

  ngOnInit(): void {
    this.selectedAnimation = getRandomAnimation();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uuid = params.get('uuid');
     
       this.getProduct(this.uuid );
 
    })
    this.O_customerBasket$ = this.S_customerBasket.O_basket$;
    this.O_customerBasket$.subscribe
    (    (response)=>
          {
            this.quantityBasket =this.getQuantityProductInBacket(  );
          },
          (error) => console.log(error))

  }

  getQuantityProductInBacket(  ) :number  {
    const items =  this.S_customerBasket.getCurrentShopingBasketValue() !=null? this.S_customerBasket.getCurrentShopingBasketValue().items: null
    if(items !=null){
      if(items.length<=0)
        return 0 
      const i= items.findIndex(i => i.uuid === this.product.uuid);
      console.log("i :" +i );
      if(i<0)
        return 0 
      const ShopingBasketItem= items[i];
      return ShopingBasketItem.quantity;
    }
    else
      return 0;
 
  }
 
   
  /***************************************************
   *  get product from server API and initlai list product 
   ***************************************************/
   getProduct(uuid:string ) {
    this.productService.GetById(uuid) 
    .subscribe
    (    (response)=>
          {
             this.product = response ,
             this.isloading =false;
           
             this.quantityBasket =this.getQuantityProductInBacket(  );
             this.quantity = this.quantityBasket ===0? 1:this.quantityBasket ;

          },
          (errorReponse) =>{
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
            


          }  )
  }
 


  BuildArraylenghtImage( ){
    return new Array(this.product.Images.length);
  }

  
 
  showIcon(index:number) {
    if (this.product.Rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  BuildArrayNumber(length){
    return new Array(length);
  }

 

  

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1)
    {
      this.quantity--;
    }
  }
 

  addItemToBasket() {
    this.S_customerBasket.addItemToShopingBasket(this.product, this.quantity);

  }


  onProductBackClick() {
    this.router.navigate(['products']);
  }
  



}
