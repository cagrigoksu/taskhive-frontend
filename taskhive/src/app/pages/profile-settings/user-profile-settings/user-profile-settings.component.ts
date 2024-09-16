import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { DataTransferService } from '../../../services/data-transfer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInput,MatFormField, MatButton, MatLabel, NgIf],
  templateUrl: './user-profile-settings.component.html',
  styleUrl: './user-profile-settings.component.css'
})
export class UserProfileSettingsComponent {

  dts = inject(DataTransferService);
  UserService = inject(UserService);

  protected userProfileForm = new FormGroup({
    userId: new FormControl(''),
    name: new FormControl(''),// [Validators.required]),
    surname: new FormControl(''),// [Validators.required]),
    email: new FormControl(''),// [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),// [Validators.required]),
    department: new FormControl(''), //[Validators.required]),
    role: new FormControl('')//, [Validators.required]),
  })

  userProfile!: any;

  ngOnInit()
  {
      this.UserService.GetUserProfile().subscribe((data:any) => {
        this.userProfile = data;
        console.log("userProfile", this.userProfile);

        this.userProfileForm.patchValue({
          name: this.userProfile.name,
          surname: this.userProfile.surname,
          email: this.userProfile.email,
          phoneNumber: this.userProfile.phoneNumber,
          department: this.userProfile.department,
          role: this.userProfile.role
        });
      });
  }

  addOrEditUserProfile()
  {

  }

}
