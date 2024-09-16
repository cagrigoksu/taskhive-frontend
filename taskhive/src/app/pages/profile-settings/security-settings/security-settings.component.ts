import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DataTransferService } from '../../../services/data-transfer.service';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatLabel, NgIf, MatButton],
  templateUrl: './security-settings.component.html',
  styleUrl: './security-settings.component.css'
})
export class SecuritySettingsComponent {

  dts = inject(DataTransferService);
  UserService = inject(UserService);

  protected userPasswordChangeForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),// [Validators.required]),
    newPasswordConfirmation: new FormControl('')
  })

  uuserPasswordChangeData !: any;

  changePassword() {

  }

}
