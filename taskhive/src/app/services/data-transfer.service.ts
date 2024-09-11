import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private data = new BehaviorSubject<any>(null);

  data$: Observable<any> = this.data.asObservable();

  setData(data: any): void {
    this.data.next(data);
  }
}
