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

  baseUrl = 'https://taskhive-backend.azurewebsites.net/api/Project';
//baseUrl = 'https://localhost:7134/api/Project';

getAllProjects():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetProjectListAsync`);
  }
}
