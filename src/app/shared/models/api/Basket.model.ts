 
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

 