import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DataTransferService } from '../../../services/data-transfer.service';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatLabel, NgIf, NgFor,
    MatButton, MatOption, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatIcon, MatProgressSpinnerModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  dts = inject(DataTransferService);
  projectService = inject(ProjectService);
  snackBar = inject(MatSnackBar);

  userDataString = localStorage.getItem("authUser");
  userData = this.userDataString ? JSON.parse(this.userDataString) : {};

  statusData : any;
  priorityData: any;

  loading: boolean = false;

  protected newProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    statusId: new FormControl('', [Validators.required]),
    priorityId: new FormControl('', [Validators.required]),
    createUser: new FormControl(this.userData.userId),
    budget: new FormControl('', [Validators.required])
});

  ngOnInit(){

    this.projectService.getPriority().subscribe((data:any) => {
      this.priorityData = data;
    });

    this.projectService.getStatus().subscribe((data:any) => {
      this.statusData = data;
    });
  }

  createNewProject() {
    this.loading = true;
    this.projectService.createProject(this.newProjectForm.value).subscribe((data:any) => {
      this.openSnackBar("Project saved!", "Close");
      this.loading = false;
    });

  }

  openSnackBar(msg: string, action: string){
    this.snackBar.open(msg, action);
    setTimeout(() => this.closeSnackBar(), 3000);
  }

  closeSnackBar(){
    this.snackBar.dismiss();
  }

}
