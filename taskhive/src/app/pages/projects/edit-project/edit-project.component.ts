import { ProjectService } from './../../../services/project.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectModel } from '../../../models/ProjectModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatLabel, NgIf, NgFor,
    MatButton, MatOption, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatIcon, MatTableModule, MatPaginatorModule,
    MatSuffix, MatIconButton, MatProgressSpinnerModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {

  private projectService = inject(ProjectService);
  private _snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnsToDisplay = ['name', 'status', 'priority'];
  dataSource!: any;
  projList: any;
  projItem!: any;

  userDataString = localStorage.getItem("authUser");
  userData = this.userDataString ? JSON.parse(this.userDataString) : {};

  statusData : any;
  priorityData: any;

  loading: boolean = false;

  protected projectForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    statusId: new FormControl('', [Validators.required]),
    priorityId: new FormControl('', [Validators.required]),
    budget: new FormControl('', [Validators.required]),
    createUser: new FormControl(this.userData.userId),
});

  editProject() {
    this.loading = true;
    this.projectService.editProject(this.projectForm.value).subscribe((data:any) =>{
      this.loadProjList();
      this.openSnackBar("Project saved!", "Close");
      this.loading = false
    });
  }

  ngOnInit() {
    this.loadProjList();

  }

  loadProjList(){

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

  onRowClick(rowData:any){
    const rowId = rowData.id;

    this.projectService.getProjectById(rowId).subscribe((data:any) => {

      this.projectForm.patchValue({
        id: data.id,
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        statusId: data.statusId,
        priorityId: data.priorityId,
        budget: data.budget
      });

    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    setTimeout(() => this.closeSnackBar(), 3000);
  }

  closeSnackBar(){
    this._snackBar.dismiss();
  }
}
