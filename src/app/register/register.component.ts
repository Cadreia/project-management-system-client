import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { User } from '../_models/User.model';
import { UserService } from '../_services/user/user.service';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { TokenService } from '../_services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  text: string = "Signup";
  users: User[];
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private user_service: UserService,
    private token_service: TokenService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      //username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.loading = true;
    this.user_service.register(this.registrationForm.value).subscribe(data => {
      this.handleResponse(data);
    }, error => {
      this.loading = false;
      console.log(error);
    }, () => {
      this.loading = false;
      this.submitted = true;
    });
  }

  handleResponse(data) {
    this.token_service.handleResponse(data);
    this.router.navigateByUrl('/home');
  }

  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
