import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogonComponent } from './pages/logon/logon.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';
import { SecuritySettingsComponent } from './pages/profile-settings/security-settings/security-settings.component';
import { UserProfileSettingsComponent } from './pages/profile-settings/user-profile-settings/user-profile-settings.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logon', component: LogonComponent},
    {path: '', component: MainComponent, canActivate: [authGuard]},
    {path: 'profileSettings', component: ProfileSettingsComponent,
      children: [
        {path: 'userProfileSettings', component: UserProfileSettingsComponent},
        {path: 'securitySettings', component: SecuritySettingsComponent}
      ]
    },
];
