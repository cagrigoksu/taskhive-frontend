import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() {
    const storedData = this.loadDataFromLocalStorage();
    if (storedData) {
      this.data.next(storedData);
    }}

  private data = new BehaviorSubject<any>(this.loadDataFromLocalStorage());

  data$: Observable<any> = this.data.asObservable();

  setData(data: any): void {
    this.data.next(data);
    this.saveDataToLocalStorage(data);
  }


  private loadDataFromLocalStorage(): any {
    const data = localStorage.getItem('userProfile');
    return data ? JSON.parse(data) : null;
  }

  private saveDataToLocalStorage(data: any): void {
    localStorage.setItem('userProfile', JSON.stringify(data));
  }
}
