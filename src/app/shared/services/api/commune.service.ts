import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICommune } from '../../models/api/icommune.model';
import { DataHttpService } from './base/data-http.service';

@Injectable({
  providedIn: 'root'
})
export class CommuneService extends DataHttpService<ICommune, string> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiBaseServer.Products}${environment.product.TableCommune}`);
  }
}