import { MatButton } from '@angular/material/button';
import { Component } from '@angular/core';
import { TaskhiveHeaderComponent } from '../../parts/taskhive-header/taskhive-header.component';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TaskhiveHeaderComponent, RouterModule, MatButton, MatIcon, MatMenuModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
