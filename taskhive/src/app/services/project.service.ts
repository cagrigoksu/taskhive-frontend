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

  statusData: any;
  priorityData: any;
  projectsTable: any;

  createProject(data:any){
    return this.httpClient.post(`${this.baseUrl}/CreateProject`, data);
  }

  getPriority():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetPriorityEnum`);
  }

  getProjects():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetProjects`);
  }

  getStatus():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/GetStatusEnum`);
  }


}
