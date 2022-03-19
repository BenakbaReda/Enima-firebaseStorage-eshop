import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IShopingCode } from '../../models/api/ShopingCode.model';
 
import { BaseHttpService } from './base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseCodeService extends BaseHttpService<IShopingCode, string> {


  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiBaseServer.Products}${environment.product.TableCode}`);
  }
}
