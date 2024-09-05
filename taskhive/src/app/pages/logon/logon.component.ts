import { Component, inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button'; 
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, 
    MatButtonModule, MatInputModule, MatFormField, MatLabel, MatCheckbox],
  templateUrl: './logon.component.html',
  styleUrl: './logon.component.css'
})
export class LogonComponent {
  authService = inject(AuthService);
  router = inject(Router);

  protected logonForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
    isCompanyUser: new FormControl(false),
  })
  
  public onSubmit() {

    if (this.logonForm.valid) {

      console.log(this.logonForm.value);
      
      this.authService.logOn(this.logonForm.value)
      .subscribe((data:any) => {
        if (this.authService.isLoggedIn()){
          this.router.navigate(['']);
        }
        console.log('mydata: '+ JSON.stringify(data));
      });
    }
  }
}
