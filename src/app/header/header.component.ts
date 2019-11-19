import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { TokenService } from '../_services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  logout() {
    this.authentication_service.LoggedStatus(false);
    this.authentication_service.logout();
  }

  constructor(
    private authentication_service: AuthenticationService,
    private token_service: TokenService
  ) {
    this.authentication_service.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
  }

}
