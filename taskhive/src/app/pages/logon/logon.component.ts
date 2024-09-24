import { Component, inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { DataTransferService } from '../../services/data-transfer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf,
    MatButtonModule, MatInputModule, MatFormField, MatLabel, MatCheckbox, MatProgressSpinnerModule],
  templateUrl: './logon.component.html',
  styleUrl: './logon.component.css'
})
export class LogonComponent {
  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  spinner: boolean = false;

  protected logonForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConf: new FormControl('', [Validators.required])
  })

  public logon() {

    this.spinner = true;

    if (this.logonForm.valid) {

      this.authService.logOn(this.logonForm.value)
      .subscribe((data:any) => {
        if (this.authService.isLoggedIn()){
          this.spinner = false;
          this.router.navigate(['']);
        }
      });
    }
  }
}
