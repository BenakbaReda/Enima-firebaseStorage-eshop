import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  hide = true;
  loading = false;
  returnUrl!: string;
  submitted = false;

  constructor(
      private S_account : AccountService,
      private toastr: ToastrService,
      private router: Router,
      private activatedRoute: ActivatedRoute){} 

 
  ngOnInit(): void {

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/products';
    this.createLoginForm();  
  }


  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('reda_amine@enimashoping.com', [Validators.required, Validators.email]),
      password: new FormControl('amine1980', [Validators.required, Validators.minLength(8)])
    });
  }


 

  get f(){
    return this.loginForm.controls;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
 

  SubmitLogin()
  {
      this.submitted = true;
 
      if (this.loginForm.invalid) {
       this.toastr.error("login form is invalid", "Error");
        return;
      } 
      this.loading=true;
      //console.log("front->end : " +  JSON.stringify(this.loginForm.value, null, 2));
      this.S_account.login(this.loginForm.value).subscribe(
        (data) => {
                
                   this.toastr.success("loging success", "Info");
                   console.log("login:  " + JSON.stringify(data));
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
      );  
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

}
