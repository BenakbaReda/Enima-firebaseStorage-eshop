import { Component, Input, OnInit } from '@angular/core';
import { CustomerBasketService } from 'src/app/client/services/customer-basket.service';
import { IProduct } from 'src/app/shared/models/iproduct.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  colorAdd = "accent";
  colorDetail = "accent";
  quantity = 1;
  @Input()  product:IProduct ; 
  @Input()  seletedAnimation:string ; 



  constructor(   private Service: CustomerBasketService   ) { }
 

  ngOnInit(): void {


    
  }

  
  BuildArrayNumber(length){
    return new Array(length);
  }

  

  BuildStart(isBorder:boolean): string{
    if(isBorder)
      return 'star_border'
    return 'star'
  }
  showIcon(index:number) {
    if (this.product.Rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  addItemToBasket(  ) {
    this.Service.addItemToShopingBasket(this.product,  this.quantity);

  }

  getFaceImageFRomPhotos()
  {
    return this.product.Images.length>0?this.product.Images[0].Url:"assets/bg-img/0.jpg";
  }
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1)
    {
      this.quantity--;
    }
  }
 
 getanimation()
 {
       return   this.seletedAnimation ;

 }  
}
