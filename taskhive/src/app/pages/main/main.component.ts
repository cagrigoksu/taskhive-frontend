import { AfterViewInit, Component, inject, input, Input, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { ProjectService } from '../../services/project.service';
import { Observable, subscribeOn, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { JsonpInterceptor } from '@angular/common/http';
import { map } from 'rxjs';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {

  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  projectervice = inject(ProjectService);
  router = inject(Router);
  subscription!: Subscription;
  columnsToDisplay = ['id', 'project_name', 'department', 'team', 'manager', 'number_of_members'];


  getAllJobPostsResponse!: any;
  jobList!: any;
  userProfile!: any;
  dataSource!: any;

  constructor(){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){

    //this.dataTransferService.data$;
    console.log("userData", this.userProfile);
    this.projectervice.getAllJobPosts().subscribe((data:any) =>{
      console.log("data", data);
      this.jobList = data;
      this.dataSource = new MatTableDataSource<MyClass>(this.jobList);
      this.dataSource.paginator = this.paginator;
      console.log("getAllJobPostsResponse", this.jobList)
    });
  }

  public logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
export interface MyClass {
  id: number;
  project_name: string;
  department: string;
  team: string;
  manager: string;
  number_of_members: number;
}

