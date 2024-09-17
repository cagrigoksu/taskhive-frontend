import { Globals } from './../../utils/globals';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {  }

baseUrl = Globals.baseUrl + '/api/Project';

getAllProjects():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetProjectList`);
  }
}
