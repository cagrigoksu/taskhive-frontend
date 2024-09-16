import { Globals } from './../../utils/globals';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DataTransferService } from '../services/data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  dts = inject(DataTransferService);

  baseUrl = Globals.baseUrl + '/api/UserAuth';

  //7134: taskhive
  //7062: apigateway
  //7007: user service

  logIn(data:any)
  {
    return this.httpClient.post(`${this.baseUrl}/LogIn`, data)
      .pipe(tap((result) => {
        if(result !== null){
          localStorage.setItem('authUser', JSON.stringify(result));
        }
      }));
  }

  logOn(data:any)
  {
      return this.httpClient.post(`${this.baseUrl}/LogOn`, data)
      .pipe(tap((result) => {
        if(result !== null){
          localStorage.setItem('authUser', JSON.stringify(result));
        }
      }));

  }

  logOut()
  {
    localStorage.removeItem('authUser');
    localStorage.removeItem('userProfile');
    this.dts.setData(null);
  }

  isLoggedIn()
  {
    return localStorage.getItem('authUser') !== null;
  }
}
