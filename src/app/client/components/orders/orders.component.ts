import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/api/order.model';
import { OrdersService } from '../../services/orders.service';
 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['Order' , 'Date', 'Total', 'Status'];

  orders: IOrder[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.ordersService.getOrdersForUser().subscribe((orders: IOrder[]) => {
      this.orders = orders;
      
    }, error => {
      console.log(error);
    });
  }
}
