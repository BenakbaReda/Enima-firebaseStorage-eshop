import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, of, switchMap, timer } from 'rxjs';
import { IUser, IUserRegister, IUserRegisterResponse } from 'src/app/shared/models/iuser.model';
import { AccountService } from 'src/app/shared/services/account/account.service';
 

 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Roles: any = ['Admin', 'Author', 'Reader'];
  public registerForm!: FormGroup;
  hide = true;
  loading = false;
  returnUrl!: string;
  submitted = false;
  accountService: any;
  
  constructor(
    private S_account : AccountService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute){} 

  ngOnInit(): void {

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/products';
    this.createregisterForm(); 
  }

  createregisterForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('reda_amine@enimashoping.com', [Validators.required, Validators.email]),
      password: new FormControl('reda_amine@2022', [Validators.required, Validators.minLength(8)]),
      username: new FormControl('reda_amine', [Validators.required, Validators.minLength(4)]),
      phone: new FormControl('0540506935', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]),

    });
  }



  get f(){
    return this.registerForm.controls;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public SubmitRegister()
  {
      this.submitted = true;
      console.log("registerComponent : call  SubmitLogin ");
      if (this.registerForm.invalid) {
        return;
      } 
      this.loading=true;
 
      this.S_account.register(this.registerForm.value ).subscribe( 
           (data) => {
         
                this.toastr.success("register user  success", "Info");
                console.log("register elm :  " + JSON.stringify(data));
                this.router.navigateByUrl(this.returnUrl);
                this.loading=false;
              },
              (errorReponse) => {
                let errMsg: string;
                if (!navigator.onLine) {
                  errMsg = "Check your internet connection and try again";
                }
                else if (errorReponse.error instanceof ErrorEvent) {
                  // A client-side or network error occurred. Handle it accordingly.
                  errMsg =  `An error occurred:  +  ${errorReponse.error.message}`  ;
                } else if(errorReponse.error instanceof ProgressEvent){
                  errMsg =  `An error occurred:  +  ${errorReponse.message } message: ${errorReponse.statusText } ERR_CONNECTION_REFUSED`     ;
                }
                else {
                  // The backend returned an unsuccessful response code.
                  // The response body may contain clues as to what went wrong,
                  errMsg =`Backend returned code ${errorReponse.status}   message:  ${errorReponse.error}`
                }
                this.toastr.error(errMsg, "Error");
                console.log(errorReponse);
                this.loading=false; 
                
           
              },
        () => {
          // No errors, route to new page
        }
      )
   
  }


  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control) => {
        return timer(500).pipe(
            switchMap(() => {
                if (!control.value) {
                    return of(null);
                }
                return this.accountService
                    .checkEmailExists(control.value)
                    .pipe(
                        map((res) => {
                            return res ? { emailExists: true } : null;
                        })
                    );
            })
        );
    };
}
}
