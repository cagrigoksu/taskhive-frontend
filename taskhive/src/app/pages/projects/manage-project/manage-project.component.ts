import { CommonModule, NgIf } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatLabel, NgIf,
    MatButton, MatOption, MatSelectModule, MatIcon, MatTableModule, MatPaginatorModule,
  MatSuffix, MatIconButton, CommonModule, FormsModule, MatExpansionModule],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.css'
})
export class ManageProjectComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly panelOpenState = signal(false);

  columnsToDisplay = ['id', 'projectName'];
  dataSource = new MatTableDataSource<Project>(this.createDummyProjects());
  teamMembers: TeamMember[] = this.createDummyMembers();

  filteredTeamMembers: TeamMember[] = [...this.teamMembers]; // Duplicate list for filtering
  searchText = '';

  selectedTeamMembers: TeamMember[] = [];

  protected projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    budget: new FormControl('', [Validators.required])
  });

  ngAfterViewInit() {
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
  }

  filterTeamMembers() {
    const search = this.searchText.toLowerCase().trim();
    this.filteredTeamMembers = this.teamMembers.filter(member =>
      member.name.toLowerCase().includes(search) ||
      member.surname.toLowerCase().includes(search) ||
      member.department.toLowerCase().includes(search) ||
      member.role.toLowerCase().includes(search)
    );
  }

  manageProject() {
    console.log(this.projectForm.value);
  }

  addTeamMember(selectedMember:TeamMember) {
    // Avoid adding duplicates
    if (!this.selectedTeamMembers.includes(selectedMember)) {
      this.selectedTeamMembers.push(selectedMember);
    }
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

  createDummyMembers(): TeamMember[] {
    return [
      { userId:1, name: 'John', surname: 'Doe', department: 'Development', role: 'Developer' },
      { userId:2, name: 'Jane', surname: 'Smith', department: 'Design', role: 'Designer' },
      { userId:3, name: 'Michael', surname: 'Johnson', department: 'Marketing', role: 'Marketer' },
      { userId:4, name: 'Emily', surname: 'Davis', department: 'HR', role: 'HR Manager' },
      { userId:5, name: 'Daniel', surname: 'Brown', department: 'Finance', role: 'Accountant' },
    ]
  }
}

interface Project {
  id: number;
  projectName: string;
}

export interface TeamMember {
  userId: number;
  name: string;
  surname: string;
  department: string;
  role: string;
}
