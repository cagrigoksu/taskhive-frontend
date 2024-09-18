import { Component } from '@angular/core';
import { TaskhiveHeaderComponent } from '../../parts/taskhive-header/taskhive-header.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [TaskhiveHeaderComponent, RouterModule, MatMenuModule, MatIcon],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {

}
