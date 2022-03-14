import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from 'src/app/shared/models/ibrand.model';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../base/base-http.service';
 
const API_BRAND_NAME:string    = 'products/';
@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseHttpService<IBrand, string> {


  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.api.BaseUrlProducts}${environment.TableBrand}`);
  }
}
