import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private httpClient: HttpClient) {  }

  baseUrl = Globals.baseUrl + '/api/Helper';

  getDepartments():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetDepartments`);
  }

  getRoles():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetRoles`);
  }
}
