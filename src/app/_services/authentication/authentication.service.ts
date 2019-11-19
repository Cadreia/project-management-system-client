import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models/User.model';
import { TokenService } from '../token/token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(this.token_service.isLoggeddIn());
  authStatus = this.loggedIn.asObservable();
  error = null;
  token: string;

  constructor(
    private http: HttpClient,
    private user_service: UserService,
    private token_service: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  authenticate(formData) {
    return this.http.post(this.user_service.baseUrl + 'login', formData, { headers: { 'Content-Type': 'application/json' } });
  }

  logout() {
    this.token_service.deleteToken();
    this.router.navigate(['login'], { relativeTo: this.route });
  }

  handleError(error) {
    this.error = error;
    if (this.error == 'Unauthorised') {
      this.error = "Username or Password is incorrect";
    }
  }

  LoggedStatus(status) {
    this.loggedIn.next(status);
  }
}
