import { DataTransferService } from './data-transfer.service';
import { Globals } from './../../utils/globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = Globals.baseUrl + "/api/User";

  dts = inject(DataTransferService);

  getUserProfile(): Observable<any>
  {
    let userDataString = localStorage.getItem('authUser');
    let userData = userDataString ? JSON.parse(userDataString) : {};

    return this.httpClient.get(`${this.baseUrl}/GetUserProfileByUserId/${userData.userId}`).pipe(
      catchError(this.handleError) // Handle errors
    );

    // return this.dts.userData$.pipe(
    //   switchMap(data => {
    //     const userId: number = data.user; // Extract userId from the emitted data
    //     return this.httpClient.get(`${this.baseUrl}/GetUserProfileByUserId/${userId}`);
    //   })
    // );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return of({});
  }

  addOrEditUserProfile(data:any){
    return this.httpClient.post(`${this.baseUrl}/AddOrEditUserProfile`, data);
  }
}
