import { Component } from '@angular/core';
import { TaskhiveHeaderComponent } from '../../parts/taskhive-header/taskhive-header.component';
import { RouterModule } from '@angular/router';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [TaskhiveHeaderComponent, RouterModule, SecuritySettingsComponent],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {

}
