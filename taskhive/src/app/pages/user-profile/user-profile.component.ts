import { UserService } from './../../services/user.service';
import { Component, inject } from '@angular/core';
import { TaskhiveHeaderComponent } from "../../parts/taskhive-header/taskhive-header.component";
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { DataTransferService } from '../../services/data-transfer.service';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TaskhiveHeaderComponent, ReactiveFormsModule, MatCardModule, MatInput,MatFormField, MatButton, MatLabel, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

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
