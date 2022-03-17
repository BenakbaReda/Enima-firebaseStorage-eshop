import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { IShopingBasketTotals } from 'src/app/shared/models/ShopingBasket.model';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CustomerBasketService } from '../../services/customer-basket.service';
 

 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

 
  @ViewChild('stepper') private myStepper: MatStepper;
  colorNext = "accent";
  colorBefore = "accent"; 



    
  O_basketTotal$: Observable<IShopingBasketTotals>;
  O_stepperOrientation: Observable<StepperOrientation>;
  isLinear = true;
 
  addressForm: FormGroup;
  deliveryForm:FormGroup;
  paymentForm :FormGroup;
  constructor( private fb: FormBuilder,
               breakpointObserver: BreakpointObserver ,
               private  S_basket:CustomerBasketService,
               private S_account:AccountService) {
    this.O_stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

 
  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.O_basketTotal$ = this.S_basket.O_basketTotal$;

  }


  createCheckoutForm() {
        this.addressForm= this.fb.group({
            firstName: ['reda1', Validators.required],
            lastName: ['amine1', Validators.required],
            phone: ['05405214251', Validators.required],
            street: ['cite 11 dec 1960 n 2831', Validators.required],
            wilaya: ['alger1', Validators.required],
            commune: ['ain benian1 ', Validators.required],
             
        }); 
        this.deliveryForm= this.fb.group({
            deliveryMethod: [null, Validators.required],
        });
        this.paymentForm= this.fb.group({
            nameOnCard: [null, Validators.required],
        });
   
}


 
  
  getAddressFormValues() {
    /* this.S_account.getUserAddress().subscribe(
        (address) => {
            if (address) {
                this.checkoutForm.get('addressForm').patchValue(address);
            }
        },
        (error) => {
            console.log(error);
        }
    ); */
}
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
isOptional = false;

ngssOnInit() {
  this.firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  this.secondFormGroup = this.fb.group({
    secondCtrl: '',
  });
}



goBack(stepper: MatStepper) {
  stepper.previous();
}
goForward(stepper: MatStepper) {
  stepper.next();
   
}

}
