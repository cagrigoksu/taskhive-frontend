import { AfterViewInit, Component, inject, input, Input, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Observable, subscribeOn, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { JsonpInterceptor } from '@angular/common/http';
import { map } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, MatPaginatorModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {

  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  router = inject(Router);
  subscription!: Subscription;
  columnsToDisplay = ['title', 'city', 'country'];

  getAllJobPostsResponse!: any;
  jobList!: any;
  userProfile!: any;
  dataSource!: any;
  
  constructor(){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    
    //this.dataTransferService.data$;
    //console.log("userData", this.userProfile);
    //this.postMicroservice.getAllJobPosts().subscribe((data:any) =>{
      //console.log("data", data);
      //this.jobList = JSON.parse(data.data);
      //this.dataSource = new MatTableDataSource<MyClass>(this.jobList);
      //this.dataSource.paginator = this.paginator;
      //console.log("getAllJobPostsResponse", this.jobList)
    //});
  }
  
  public logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
export interface MyClass {
  title:string, 
  city:string,
  country:string;
}
