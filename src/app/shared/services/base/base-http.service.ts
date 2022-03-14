import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IBaseService } from './ibase-service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T, ID> implements IBaseService<T, ID> {

  constructor(
    protected _http: HttpClient,
    @Inject(String) protected _Linkbase: string
  ) {}

  protected handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return   throwError(applicationError);    
    }

    var modelStateErrors: string | null = '';
    var serverError = error.json();

    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(modelStateErrors || 'Server error');
  }
  
  Add(t: T): Observable<T> {
   console.log(this._Linkbase);
    return this._http.post<T>(this._Linkbase, t);
  }

  AddJson(t: T): Observable<T> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(t);
    return this._http.post<T>(this._Linkbase, body,{'headers':headers});
  }
  Update(uuid: ID, t: T): Observable<T> {
    return this._http.put<T>(this._Linkbase + "/" + uuid, t, {});
  }

  GetById(uuid: ID): Observable<T> {
    return this._http.get<T>(this._Linkbase + "/" + uuid);
  }

  GetAll(): Observable<T[]> {
    return this._http.get<T[]>(this._Linkbase)
  }

  Delete(uuid: ID): Observable<T> {
    return this._http.delete<T>(this._Linkbase + '/' + uuid);
	}

 

}
