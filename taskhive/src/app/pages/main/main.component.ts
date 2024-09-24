import { map } from 'rxjs';
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
import { ProjectModel } from '../../models/ProjectModel';
import { TaskhiveFooterComponent } from '../../parts/taskhive-footer/taskhive-footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, MatPaginatorModule, MatButtonModule, TaskhiveHeaderComponent, TaskhiveFooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})


export class MainComponent {

  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  projectService = inject(ProjectService);
  router = inject(Router);

  columnsToDisplay = ['id', 'name', 'priority', 'status'];

  projList!: any;
  userProfile!: any;
  dataSource!: any;

  priorityData: any;
  statusData: any;

  constructor(){  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){

    this.projectService.getStatus().subscribe((data:any) =>{
      this.statusData = data;

      this.projectService.getPriority().subscribe((data:any) =>{
        this.priorityData = data;

        this.projectService.getProjects().subscribe((data:any) =>{

          const statusMap = new Map(this.statusData.map((status: any) => [status.id, status.value]));
          const priorityMap = new Map(this.priorityData.map((priority: any) => [priority.id, priority.value]));

          this.projList = data.map((project: any) => ({
            ...project,
            status: statusMap.get(project.statusId),
            priority: priorityMap.get(project.priorityId)
          }));

          this.dataSource = new MatTableDataSource<ProjectModel>(this.projList);
          this.dataSource.paginator = this.paginator;
        });
      });

    });

  }

}


