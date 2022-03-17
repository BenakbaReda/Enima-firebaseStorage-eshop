import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerBasketService } from 'src/app/client/services/customer-basket.service';
import { CustomerCheckoutService } from 'src/app/client/services/customer-checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod.model';
 

 

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {
    panelOpenState = false;
    @Input() deliveryForm: FormGroup;

    deliveryMethods: IDeliveryMethod[];
    
    selectedDeliveryMethod: string;
    
    constructor(
        private S_checkout: CustomerCheckoutService,
        private S_basket : CustomerBasketService
    ) {}

    ngOnInit(): void {
        this.S_checkout.getDeliveryMethods().subscribe(
            (dm: IDeliveryMethod[]) => {
                this.deliveryMethods = dm;
                console.log(dm);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    setShippingPrice(deliveryMethod: IDeliveryMethod) {
        this.S_basket.setShippingPrice(deliveryMethod);
    }
}
