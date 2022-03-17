import { Component, OnInit } from '@angular/core';
 
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IShopingBasket, IShopingBasketItem, IShopingBasketTotals } from 'src/app/shared/models/ShopingBasket.model';
import { PurchaseCodeService } from 'src/app/shared/services/purchaseCode/purchase-code.service';
import { CustomerBasketService } from '../../services/customer-basket.service';
 


@Component({
  selector: 'app-customer-basket',
  templateUrl: './customer-basket.component.html',
  styleUrls: ['./customer-basket.component.css']
})
export class CustomerBasketComponent implements OnInit {
 
  displayedColumns: string[] = ['image' , 'productName', 'price', 'quantity','total', 'actions'];
  O_basket$: Observable<IShopingBasket>;
  O_basketTotal$: Observable<IShopingBasketTotals>;
  codePromo:string ="36716d57-c029-446a-b7a1-1b1cd33c7990";
 
  constructor(  private  router: Router, 
                private  S_basket:CustomerBasketService) {  }

  ngOnInit(): void {
    this.O_basket$ = this.S_basket.O_basket$;
    this.O_basketTotal$ = this.S_basket.O_basketTotal$;
 
  }

  removeBasketItem(item: IShopingBasketItem) {
    this.S_basket.removeItemFromShopingBasket(item);
  }

  incrementItemQuantity(item: IShopingBasketItem) {
    this.S_basket.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IShopingBasketItem) {
    this.S_basket.decrementItemQuantity(item);
  }



  setPurchaseCode( ) {
    this.S_basket.setCodePrice(this.codePromo)
  }


 
 


  onProductBackClick() {
    this.router.navigate(['products']);
  }
  
 
  
}
 