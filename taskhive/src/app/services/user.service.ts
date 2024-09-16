import { DataTransferService } from './data-transfer.service';
import { Globals } from './../../utils/globals';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = Globals.baseUrl + "/api/User";

  dts = inject(DataTransferService);

  GetUserProfile(): Observable<any>
  {
    return this.dts.userData$.pipe(
      switchMap(data => {
        const userId: number = data.user; // Extract userId from the emitted data
        return this.httpClient.get(`${this.baseUrl}/GetUserProfileByUserId/${userId}`);
      })
    );
  }
}
