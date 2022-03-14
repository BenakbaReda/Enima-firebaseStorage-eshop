import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod.model';
import { IProduct } from 'src/app/shared/models/iproduct.model';
import { IShopingBasket, IShopingBasketItem, IShopingBasketTotals, ShopingBasket } from 'src/app/shared/models/ShopingBasket.model';
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
  shipping = 0;
  constructor(private http: HttpClient) { }



  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
}

  getShopingBasket(uuid: string) {
    return this.http.get(this.baseUrl + 'shopingbasket?uuid=' + uuid).pipe(
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
    return this.http.post(this.baseUrl + 'shopingbasket', basket).subscribe((response: IShopingBasket) => {
      this._BS_basket.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  UpdateShopingBasket(basket: IShopingBasket) {
    return this.http.put(this.baseUrl + 'shopingbasket/' +basket.uuid , basket).subscribe((response: IShopingBasket) => {
      this._BS_basket.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
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

  deleteShopingBasket(basket: IShopingBasket) {
    return this.http
           .delete(this.baseUrl + 'shopingbasket?uuid=' + basket.uuid)
           .subscribe(() => {
                this._BS_basket.next(null);
                this._BS_basketTotal.next(null);
                localStorage.removeItem('shopingbasket_uuid');
           }, error => {
                    console.log(error);
          }
        );
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

  private calculateTotals() {
    const basket = this.getCurrentShopingBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this._BS_basketTotal.next({shipping, total, subtotal});
  }





}

