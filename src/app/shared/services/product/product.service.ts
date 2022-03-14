import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/shared/models/iproduct.model';
import { environment } from 'src/environments/environment';
import { DataHttpService } from '../base/data-http.service';
 
 

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataHttpService<IProduct, string> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiBaseServer.Products}${environment.product.TableProduct}`);
  }
}
