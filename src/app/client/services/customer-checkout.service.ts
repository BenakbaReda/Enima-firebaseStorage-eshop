import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod.model';
import { IOrderToCreate } from 'src/app/shared/models/order.model';
import { environment } from 'src/environments/environment';
 
 
 

@Injectable({
  providedIn: 'root'
})
export class CustomerCheckoutService {

    baseUrl = environment.apiBaseServer.Products;

    constructor(private http: HttpClient) {}

    createOrder(order: IOrderToCreate) {
        console.log(order);
        return this.http.post(this.baseUrl + 'orders', order);
    }



    getDeliveryMethods() {
        return this.http.get(this.baseUrl + 'DeliveryType').pipe(
            map((dm: IDeliveryMethod[]) => {
                console.log(dm);
                return dm.sort((a, b) => b.price - a.price);
            })
        );
    }
}
