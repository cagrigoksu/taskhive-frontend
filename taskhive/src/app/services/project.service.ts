import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {

  }

  //baseUrl = 'https://localhost:7054/api/UserAuth';
  baseUrl = 'https://dummyjson.com/c/6a61-e480-4a75-b554';

  getAllProjects():Observable<any>
  {
      return this.httpClient.get(`${this.baseUrl}`);
  }
}
