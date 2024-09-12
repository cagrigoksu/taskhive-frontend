import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { ProjectService } from '../../services/project.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { TaskhiveHeaderComponent } from '../../parts/taskhive-header/taskhive-header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, MatPaginatorModule, MatButtonModule, TaskhiveHeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})


export class MainComponent {

  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  projectService = inject(ProjectService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  columnsToDisplay = ['id', 'project_name', 'department', 'team', 'manager', 'number_of_members'];

  projList!: any;
  userProfile!: any;
  dataSource!: any;

  constructor(){  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){

    this.projectService.getAllProjects().subscribe((data:any) =>{
      this.projList = data;
      this.dataSource = new MatTableDataSource<MyClass>(this.projList);
      this.dataSource.paginator = this.paginator;
    });
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

