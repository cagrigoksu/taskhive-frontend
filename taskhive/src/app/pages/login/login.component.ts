import { Component, inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  spinner: boolean = false;

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  logIn()
  {

    this.spinner = true;

    if(this.loginForm.valid){

      this.authService.logIn(this.loginForm.value)
      .subscribe((data: any) => {
        if(this.authService.isLoggedIn()){
          // this.dataTransferService.setData(data);
          this.spinner = false;
          this.router.navigate(['']);
        }
        else
        {
          this.spinner = false;
          this.openSnackBar("Please check your email or password.","Close");
        }
      });
    }
  }

  logOn(){
    this.router.navigate(['/logon']);
  }

  openSnackBar(msg: string, action: string){
    this.snackbar.open(msg, action);
    setTimeout(() => {
      this.closeSnackBar();
    }, 5000);
  }

  closeSnackBar() {
    this.snackbar.dismiss();
  }
}
