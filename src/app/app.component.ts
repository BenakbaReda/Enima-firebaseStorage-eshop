import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Observable } from 'rxjs';
import { CustomerBasketService } from './client/services/customer-basket.service';
import { IUser } from './shared/models/iuser.model';
import { IShopingBasket } from './shared/models/ShopingBasket.model';
import { AccountService } from './shared/services/account/account.service';
import { themeOption } from './shared/services/theme/theme-option.model';
import { ThemeService } from './shared/services/theme/theme.service';

export class EnimaMenuLink {

  path: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'E-shop-enima';
  AccountMenu :EnimaMenuLink[]= [
      { path: '/account/login'    , active: true  }, 
      { path: '/account/register' , active: false }
    ];
  MenuPublic :EnimaMenuLink[]= [
    { path: '/account/login'    , active: true  }, 
    { path: '/account/register' , active: false }
  ];

  MenuProfile :EnimaMenuLink[]= [
    { path: '/account/login'    , active: true  }, 
    { path: '/account/register' , active: false }
  ];


  currentUser$: Observable<IUser>;

  O_basket$: Observable<IShopingBasket>;
  O_options$: Observable<Array<themeOption>> = this.themeService.getThemeOptions();
  options: Array<themeOption>;

  constructor( private S_account: AccountService,
               private readonly themeService: ThemeService, 
               private S_basket:CustomerBasketService) { }




ngOnInit(){
   
    this.AOSInit();
    this.observableInit();
    this.themeInit();
}




observableInit()
{
  this.currentUser$ = this.S_account.get_O_CurrentUser();
  this.O_basket$ = this.S_basket.O_basket$;
}
AOSInit()
{
    AOS.init({
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      duration: 700,
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
    });
}
themeInit()
{
    console.log(this.O_options$);
    this.themeService.setTheme("deeppurple-amber");
     this.O_options$.subscribe(
       resp  =>
       {

        this.options= resp;
        console.log(this.options);
       }

     )
}



themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet); 
}


loginOut(){
  console.log('MenuProfileComponent : loginOut ');
  this.S_account.logout();
}




}
