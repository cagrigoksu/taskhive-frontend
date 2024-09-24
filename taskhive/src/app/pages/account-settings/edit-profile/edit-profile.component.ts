import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DataTransferService } from '../../../services/data-transfer.service';
import { UserService } from '../../../services/user.service';
import { HelperService } from '../../../services/helper.service';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule,
    NgIf,
    MatInput,MatFormField, MatButton, MatLabel, MatSelectModule, MatOption, MatProgressSpinnerModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  dts = inject(DataTransferService);
  UserService = inject(UserService);
  HelperService = inject(HelperService);
  snackBar = inject(MatSnackBar);

  userDataString = localStorage.getItem("authUser");
  userData = this.userDataString ? JSON.parse(this.userDataString) : {};

  userProfile!: any;
  departments!: any;
  roles!: any;
  spinner: boolean = false;

  protected userProfileForm = new FormGroup({
    userId: new FormControl(this.userData.userId),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required])
  });


  ngOnInit()
  {
      // get departments
      this.HelperService.getDepartments().subscribe((data:any) =>{
        this.departments = data;
      });

      // get roles
      this.HelperService.getRoles().subscribe((data:any) =>{
        this.roles = data;
      });

      // get user profile
      this.UserService.getUserProfile().subscribe((data:any) => {

        this.userProfile = data;

        this.userProfileForm.patchValue({
          userId: this.userData.userId,
          name: this.userProfile.name,
          surname: this.userProfile.surname,
          phoneNumber: this.userProfile.phoneNumber,
          departmentId: this.userProfile.departmentId,
          roleId: this.userProfile.roleId
        });
      });


  }

  addOrEditUserProfile()
  {
    this.spinner = true;
    return this.UserService.addOrEditUserProfile(this.userProfileForm.value)
      .subscribe(() => {
        this.openSnack("Profile saved!", "Close");
        this.spinner = false;
      });
  }

  openSnack(msg: string, action: string){
    this.snackBar.open(msg, action);
    setTimeout(() => {
      this.closeSnackBar();
    }, 3000);
  }

  closeSnackBar(){
    this.snackBar.dismiss()
  }

}
