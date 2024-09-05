import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  //http_Client = inject(HttpClient);
  baseUrl = 'https://localhost:7134/api/UserAuth';
  //baseUrl = 'https://xxxxx.azurewebsites.net/api/UserAuth';

  //7134: jobboard
  //7062: apigateway
  //XXXX: user service
  
  logIn(data:any)
  {
    console.log("login data received.");
    console.log('url: '+`${this.baseUrl}/LogIn`);

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
  }

  isLoggedIn()
  {
    return localStorage.getItem('authUser') !== null;
  }
}
