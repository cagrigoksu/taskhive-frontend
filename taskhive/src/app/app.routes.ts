import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogonComponent } from './pages/logon/logon.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logon', component: LogonComponent},
    {path: '', component: MainComponent, canActivate: [authGuard]}
];
