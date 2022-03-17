import {v4 as uuidv4} from 'uuid';

export interface IAnimation {
    uuid: string;
    Name: string ;
}

export interface IShopingBasket {
    uuid: string;
    items: IShopingBasketItem[];
}

export interface IShopingBasketItem {
    uuid: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
    brand: string;
    categorie: string;
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
 
export interface IShopingCode {
    uuid: string;
    value: number;
    end_date: number;
}


 
