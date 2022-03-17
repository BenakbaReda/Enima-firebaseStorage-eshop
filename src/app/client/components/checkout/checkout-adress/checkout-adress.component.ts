import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';
 

 

@Component({
  selector: 'app-checkout-adress',
  templateUrl: './checkout-adress.component.html',
  styleUrls: ['./checkout-adress.component.css']
})
export class CheckoutAdressComponent implements OnInit {

  @Input() addressForm: FormGroup;
  
  constructor(
    private S_account : AccountService,
    private toastr: ToastrService
) {}

ngOnInit(): void {}

saveUserAddress() {
    const address = this.addressForm.value;
    this.S_account.updateAddress(address).subscribe(
        () => {
             this.toastr.success('Address saved');
        },
        (error) => {
             this.toastr.error(error.message);
            console.log(error);
        }
    );
}
}
