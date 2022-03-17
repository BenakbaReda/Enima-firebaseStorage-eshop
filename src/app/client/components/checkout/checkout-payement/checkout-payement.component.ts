import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


export class Choice {
 
  tag : string;

 
}

@Component({
  selector: 'app-checkout-payement',
  templateUrl: './checkout-payement.component.html',
  styleUrls: ['./checkout-payement.component.css']
})
export class CheckoutPayementComponent implements OnInit {

 
  @Input() paymentForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
