import { DataTransferService } from '../../services/data-transfer.service';
import { AuthService } from '../../auth/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-taskhive-header',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatMenuModule, MatIcon],
  templateUrl: './taskhive-header.component.html',
  styleUrl: './taskhive-header.component.css'
})
export class TaskhiveHeaderComponent {

  authService = inject(AuthService);
  router = inject(Router);
  dts = inject(DataTransferService);

  userProfile!: any;

  ngOnInit(){
    this.dts.userData$.subscribe((data:any) => {
      this.userProfile = data;
    });
  }

  public logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  openAccountSettings(){
    this.router.navigate(['/account-settings/edit-profile']);
  }

  openProjects(){
    this.router.navigate(['/projects/my-projects'])
  }

  redirectToMain(){
    this.router.navigate(['/']);
  }

}
