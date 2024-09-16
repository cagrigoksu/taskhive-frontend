import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor()
  {
    const storedData = this.loadDataFromLocalStorage();

    if (storedData) {
      this.userData.next(storedData);
    }
  }

  private userData = new BehaviorSubject<any>(this.loadDataFromLocalStorage());

  userData$: Observable<any> = this.userData.asObservable();

  setData(data: any): void
  {
    this.userData.next(data);
    this.saveDataToLocalStorage(data);
  }


  private loadDataFromLocalStorage(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  private saveDataToLocalStorage(data: any): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }
}
