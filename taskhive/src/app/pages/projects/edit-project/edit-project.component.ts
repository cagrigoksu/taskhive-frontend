import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatLabel, NgIf,
    MatButton, MatOption, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatIcon, MatTableModule, MatPaginatorModule,
  MatSuffix, MatIconButton],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnsToDisplay = ['id', 'projectName'];
  dataSource = new MatTableDataSource<Project>(this.createDummyProjects());

  protected projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    budget: new FormControl('', [Validators.required])
});

  editProject() {
    console.log(this.projectForm.value);
  }


  createDummyProjects(): Project[] {
    return [
      { id: 1, projectName: 'Project Alpha' },
      { id: 2, projectName: 'Project Beta' },
      { id: 3, projectName: 'Project Gamma' },
      { id: 4, projectName: 'Project Delta' },
      { id: 5, projectName: 'Project Epsilon' },
      { id: 6, projectName: 'Project Zeta' },
      { id: 7, projectName: 'Project Eta' },
      { id: 8, projectName: 'Project Theta' },
      { id: 9, projectName: 'Project Iota' },
      { id: 10, projectName: 'Project Kappa' },
    ];
  }

  ngAfterViewInit() {
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
  }

}

interface Project {
  id: number;
  projectName: string;
}
