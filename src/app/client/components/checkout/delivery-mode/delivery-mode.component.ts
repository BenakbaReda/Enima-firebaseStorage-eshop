import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatRadioChange } from '@angular/material/radio';
import { IAddress } from 'src/app/shared/models/address.model';
import * as uuid from 'uuid';

export enum EmumDeliveryType {
   ENIMA_SHOP= 'Livraison en magasin', 
   CUSTOMER_HOME = 'Livraison en Point Relais ®', 
   RELAY_SHOP = 'Livraison à domicile',

}

export interface IDeliveryMode {
  uuid: string;
  name: string;
  deliveryDays: number;
  DeliveryType:EmumDeliveryType,
  description?: string;
  price: number;
  address:IAddress;

}

const ELEMENT_DATA: IDeliveryMode[] = [
  { uuid:uuid.v4() ,name:"Livraison en magasin",deliveryDays:3, DeliveryType:EmumDeliveryType.ENIMA_SHOP,
    description:"description", price:351  ,
    address:{     street:"11 dec 1960 N°283",  wilaya: "alger",  commune: "ain benina" } },
  { uuid:uuid.v4() ,name:"Livraison en Point Relais ®",deliveryDays:3, DeliveryType:EmumDeliveryType.CUSTOMER_HOME,
    description:"description", price:351  ,
    address:{     street:"11 dec 1960 N°283",  wilaya: "alger",  commune: "ain benina" } },
  { uuid:uuid.v4() ,name:"Livraison à domicile",deliveryDays:3, DeliveryType:EmumDeliveryType.CUSTOMER_HOME,
    description:"description", price:351  ,
    address:{     street:"11 dec 1960 N°283",  wilaya: "alger",  commune: "ain benina" } },
];

@Component({
  selector: 'app-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  styleUrls: ['./delivery-mode.component.css']
})
export class DeliveryModeComponent implements OnInit {
 
  deliveryModes:IDeliveryMode[]=[]

  deliveryModeSelected: IDeliveryMode ;
  constructor() { }

  ngOnInit(): void {
   this.deliveryModes = ELEMENT_DATA;
  }




  onChange(radio: MatRadioChange, panel: MatExpansionPanel) {
    panel.open();
  }
 
}
