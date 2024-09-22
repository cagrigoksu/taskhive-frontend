import { ProjectsComponent } from './pages/projects/projects.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogonComponent } from './pages/logon/logon.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';
import { MyProjectsComponent } from './pages/projects/my-projects/my-projects.component';
import { CreateProjectComponent } from './pages/projects/create-project/create-project.component';
import { EditProjectComponent } from './pages/projects/edit-project/edit-project.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { EditProfileComponent } from './pages/account-settings/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './pages/account-settings/edit-password/edit-password.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logon', component: LogonComponent},
    {path: '', component: MainComponent, canActivate: [authGuard]},
    {path: 'account-settings', component: AccountSettingsComponent,
      children: [
        {path: 'edit-profile', component: EditProfileComponent},
        {path: 'edit-password', component: EditPasswordComponent}
      ]
    },
    {path: 'projects', component: ProjectsComponent,
      children: [
        {path: 'my-projects', component: MyProjectsComponent},
        {path: 'create-project', component: CreateProjectComponent},
        {path: 'edit-project', component: EditProjectComponent}
      ]
    }
];
