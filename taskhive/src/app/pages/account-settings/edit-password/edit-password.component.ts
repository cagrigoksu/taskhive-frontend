import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DataTransferService } from '../../../services/data-transfer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatLabel, NgIf, MatButton],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {

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
