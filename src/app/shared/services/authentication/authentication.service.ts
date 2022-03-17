import { HttpClient   } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { BehaviorSubject, map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser   } from '../../models/iuser.model';
 

 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl =  `${environment.apiBaseServer.Accounts}`;

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

 
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}
 

   
public get currentUserValue(): IUser {
  return this.currentUserSubject.value;
}

login(username: string, password: string) {
  return this.http.post<any>(`${this.baseUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
 
}
