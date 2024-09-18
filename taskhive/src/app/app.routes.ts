import { ProjectsComponent } from './pages/projects/projects.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogonComponent } from './pages/logon/logon.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';
import { SecuritySettingsComponent } from './pages/profile-settings/security-settings/security-settings.component';
import { UserProfileSettingsComponent } from './pages/profile-settings/user-profile-settings/user-profile-settings.component';
import { MyProjectsComponent } from './pages/projects/my-projects/my-projects.component';
import { AddProjectComponent } from './pages/projects/add-project/add-project.component';
import { EditProjectComponent } from './pages/projects/edit-project/edit-project.component';

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
    {path: 'projects', component: ProjectsComponent,
      children: [
        {path: 'myProjects', component: MyProjectsComponent},
        {path: 'addProject', component: AddProjectComponent},
        {path: 'editProject', component: EditProjectComponent}
      ]
    }
];
