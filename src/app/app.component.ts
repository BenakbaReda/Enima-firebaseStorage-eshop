import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
 
 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'E-shop-enima';

  constructor(  ) { }

ngOnInit(){
   
    this.AOSInit();
    
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
 
}
