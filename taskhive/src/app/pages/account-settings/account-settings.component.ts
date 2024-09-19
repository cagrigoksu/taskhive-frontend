import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TaskhiveHeaderComponent } from '../../parts/taskhive-header/taskhive-header.component';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [TaskhiveHeaderComponent, RouterModule, MatMenuModule, MatIcon],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

}
