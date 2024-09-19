import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DataTransferService } from '../../../services/data-transfer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput,MatFormField, MatButton, MatLabel, NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  dts = inject(DataTransferService);
  UserService = inject(UserService);

  userDataString = localStorage.getItem("authUser");
  userData = this.userDataString ? JSON.parse(this.userDataString) : {};

  protected userProfileForm = new FormGroup({
    userId: new FormControl(this.userData.userId),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  userProfile!: any;

  ngOnInit()
  {
      console.log(this.userData);

      this.UserService.getUserProfile().subscribe((data:any) => {

        this.userProfile = data;

        this.userProfileForm.patchValue({
          userId: this.userData.userId,
          name: this.userProfile.name,
          surname: this.userProfile.surname,
          phoneNumber: this.userProfile.phoneNumber,
          department: this.userProfile.department,
          role: this.userProfile.role
        });
      });
  }

  addOrEditUserProfile()
  {
    return this.UserService.addOrEditUserProfile(this.userProfileForm.value)
      .subscribe();
  }

}
