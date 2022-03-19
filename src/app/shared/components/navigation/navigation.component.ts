import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerBasketService } from 'src/app/client/services/customer-basket.service';
import { IShopingBasket } from '../../models/api/Basket.model';
import { IUser } from '../../models/iuser.model';
import { AccountService } from '../../services/account/account.service';
import { themeOption } from '../../services/theme/theme-option.model';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() isRow :boolean=false;
  
  currentUser$: Observable<IUser>;
  O_basket$: Observable<IShopingBasket>;

  O_options$: Observable<Array<themeOption>> = this.themeService.getThemeOptions();
  options: Array<themeOption>;

  
  constructor( private S_account: AccountService,
                private readonly themeService: ThemeService, 
               private S_basket:CustomerBasketService) { }



  ngOnInit(): void {
    this.observableInit();
    this.themeInit();
  }


  observableInit()
{
  this.currentUser$ = this.S_account.get_O_CurrentUser();
  this.O_basket$ = this.S_basket.O_basket$;
}
themeInit()
{
   
    this.themeService.setTheme("deeppurple-amber");
    this.O_options$.subscribe(  resp  =>  {  
                                this.options= resp;  
                              } )
}



themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet); 
}

loginOut(){
  console.log('MenuProfileComponent : loginOut ');
  this.S_account.logout();
}

getFlexLayoutDisplay()
{
    if(this.isRow)
      return "row";
    else
      return "column";

}

}
