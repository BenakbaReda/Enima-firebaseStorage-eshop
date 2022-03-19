import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/shared/models/api/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  baseUrl = environment.apiBaseServer.Products;
  constructor(private http: HttpClient) { }

  getOrdersForUser(){
    
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }

  getOrder(id: number){
    
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id);
  }

}
