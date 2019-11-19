import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { BeforeLoginService } from './_guards/before-login/before-login.service';
import { AfterLoginService } from './_guards/after-login/after-login.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AfterLoginService] },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService], data: {animation: 'Login'} },
  { path: 'signup', component: RegisterComponent, canActivate: [BeforeLoginService], data: {animation: 'Signup'} },
  { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService] },
  { path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService], data: {animation: 'PasswordRequest'} },
  { path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService], data: {animation: 'PasswordResponse'} },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
