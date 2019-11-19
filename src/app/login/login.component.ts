import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/User.model';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { TokenService } from '../_services/token/token.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: User[];
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authentication_service: AuthenticationService,
    private token_service: TokenService,
    private router: Router,
    private snotify_service: SnotifyService,
    private user_service: UserService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      //username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loading = true;
    this.snotify_service.info('Please wait...', {
      timeout: 500,
      showProgressBar: false
    });
    this.authentication_service.authenticate(this.loginForm.value).subscribe((data: any) => {
      this.handleResponse(data);
    }, error => {
      this.loading = false;
      console.log(error);
      //this.authentication_service.handleError(error);
      this.snotify_service.error(error.error.error, 'Error', {
        timeout: 5000,
        showProgressBar: false
      });
    }, () => {
      this.loading = false;
      this.submitted = true;
    });
  }

  handleResponse(data) {
    this.token_service.handleResponse(data);
    this.user_service.username.next(data.success.name);
    this.authentication_service.LoggedStatus(true);
    this.router.navigateByUrl('/home');
  }
}
