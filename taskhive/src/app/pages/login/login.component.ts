import { Component, inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button'; 
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authService = inject(AuthService);
  dataTransferService = inject(DataTransferService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  logIn()
  {

    if(this.loginForm.valid){
      
      this.authService.logIn(this.loginForm.value)
      .subscribe((data: any) => {
        if(this.authService.isLoggedIn()){
          this.dataTransferService.setData(data);
          this.router.navigate(['']);
        }
      });
    }
  }

  logOn(){
    this.router.navigate(['/logon']);
  }
}
