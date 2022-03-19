import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { IShopingBasket, IShopingBasketItem } from 'src/app/shared/models/api/Basket.model';
import { IProduct } from 'src/app/shared/models/api/iproduct.model';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod.model';
import {   IShopingBasketTotals, ShopingBasket } from 'src/app/shared/models/ShopingBasket.model';
import { BasketService } from 'src/app/shared/services/api/basket.service';
import { PurchaseCodeService } from 'src/app/shared/services/api/purchase-code.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerBasketService {

  baseUrl = environment.apiBaseServer.Products;
  private   _BS_basket = new BehaviorSubject<IShopingBasket>(null);
  O_basket$ = this._BS_basket.asObservable();

  private _BS_basketTotal = new BehaviorSubject<IShopingBasketTotals>(null);
  O_basketTotal$ = this._BS_basketTotal.asObservable();
  PurchaseCodeValue = 0;
  shipping = 0;


  constructor(private http: HttpClient ,
              private CodeService:PurchaseCodeService,
              
              private toastr: ToastrService,
              private basketService:BasketService  ) { }



setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
}


setCodePrice(code: string) {
   this.CodeService.GetById(code).subscribe(
     res =>{
          const dateNow = Date.now();
          //const targetDate =  dateNow +  (1000  * 60  * 60  * 24  * 10 ); // +10 days
          if(dateNow <= res.end_date  )
          {
            this.PurchaseCodeValue = res.value;
          }
          else{
            this.PurchaseCodeValue = 0;
            this.toastr.warning("your code is expired ", "Code Info");
            console.log("your code is expired ")
          }
          this.calculateTotals();
     },
     err =>
     {
      this.PurchaseCodeValue = 0;
      this.calculateTotals();
      this.toastr.error("your code is node exist", "Code Error");
      console.error("your code is node exist")
     }
   )
  
}

getShopingBasket(uuid: string) {

    return this.basketService.GetById(uuid).pipe(
      map(( basket: IShopingBasket) => {
        this._BS_basket.next(basket);
        this.calculateTotals();
      })
    );
  }

  setShopingBasket(basket: IShopingBasket) {
    if(this.getCurrentShopingBasketValue() !=null)
      this.UpdateShopingBasket(basket);
    else
      this.PostShopingBasket(basket);
  }


  PostShopingBasket(basket: IShopingBasket) {
    return this.basketService.Add(basket).subscribe((response: IShopingBasket) => {
      this._BS_basket.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  UpdateShopingBasket(basket: IShopingBasket) {

    return this.basketService.Update(basket.uuid,basket).subscribe((response: IShopingBasket) => {
      this._BS_basket.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  deleteShopingBasket(basket: IShopingBasket) {
      return this.basketService.Delete(basket.uuid).subscribe(() => {
          this._BS_basket.next(null);
          this._BS_basketTotal.next(null);
          localStorage.removeItem('shopingbasket_uuid');
        }, error => {
              console.log(error);
        }
        );
  }

  getCurrentShopingBasketValue() {
    return this._BS_basket.value;
  }

  addItemToShopingBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IShopingBasketItem = this.mapProductItemToShopingBasketItem(item, quantity);
    const basket = this.getCurrentShopingBasketValue() !=null? this.getCurrentShopingBasketValue():this.createShopingBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setShopingBasket(basket);
  }

  incrementItemQuantity(item: IShopingBasketItem){
    const basket = this.getCurrentShopingBasketValue();
    if (basket && basket.items) {
      const index = basket.items.findIndex(i => i.uuid === item.uuid);
      basket.items[index].quantity ++;
      this.setShopingBasket(basket);
    }
  }

  decrementItemQuantity(item: IShopingBasketItem){
    const basket = this.getCurrentShopingBasketValue();
    if (basket && basket.items) {
      const index = basket.items.findIndex(i => i.uuid === item.uuid);
      if (basket.items[index].quantity > 1) {
        basket.items[index].quantity --;
        this.setShopingBasket(basket);
      }
      else {
        this.removeItemFromShopingBasket(item);
      }
    }
  }


  removeItemFromShopingBasket(item: IShopingBasketItem) {
    const basket = this.getCurrentShopingBasketValue();
    if (basket.items.some(x => x.uuid === item.uuid)) {
      basket.items = basket.items.filter(i => i.uuid !== item.uuid);
      if(basket.items.length > 0) {
        this.setShopingBasket(basket);
      } else {
        this.deleteShopingBasket(basket);
      }
    }
  }

  deleteLocalBasket(id: string) {
    this._BS_basket.next(null);
    this._BS_basketTotal.next(null);
    localStorage.removeItem('shopingbasket_uuid');
}




  private addOrUpdateItem(items: IShopingBasketItem[], itemToAdd: IShopingBasketItem, quantity: number): IShopingBasketItem[] {
    const index = items.findIndex(i => i.uuid === itemToAdd.uuid);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createShopingBasket(): IShopingBasket {
    const basket = new ShopingBasket();
    localStorage.setItem('shopingbasket_uuid', basket.uuid);
    return basket;
  }

  mapProductItemToShopingBasketItem(item: IProduct, quantity: number): IShopingBasketItem {
    return {
      uuid: item.uuid,
      productName: item.Name,
      price: item.Price,
      image: item.Images.length>0?item.Images[0].Url :"",
      quantity,
      brand: item.Brand,
      categorie: item.Categorie,
    };
  }


  IsCodeShopingBasket(code :string):boolean
  {
    return true; 
  }

  getValueOfCode( code :string)
  {
    if(this.IsCodeShopingBasket(code))
      return 150; 
    else
        return 0; 
  }
  private calculateTotals() {
    const basket = this.getCurrentShopingBasketValue();
    const delivery = this.shipping;
    const code = this.PurchaseCodeValue;
    const articleTotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const totaltmp = articleTotal + delivery-code;
    const total=totaltmp<0? 0: totaltmp;
    this._BS_basketTotal.next({articleTotal, delivery , code, total});
  }





}

