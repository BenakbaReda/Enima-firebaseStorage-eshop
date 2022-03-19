import {v4 as uuidv4} from 'uuid';
import { IShopingBasket, IShopingBasketItem } from './api/Basket.model';

export interface IAnimation {
    uuid: string;
    Name: string ;
}

 

export class ShopingBasket implements IShopingBasket{
    uuid: string = uuidv4();
    items: IShopingBasketItem[] = [];
}

export interface IShopingBasketTotals {
    articleTotal: number;
    delivery: number;
    code: number;
    total: number;
}
 
 
