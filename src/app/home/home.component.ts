import { UserService } from './../_services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = {};

  constructor(private user_service: UserService, private token_service: TokenService) { }

  ngOnInit() {
    // this.user_service.username.subscribe(name => {
    //   console.log(name);
    //   this.username = name;
    // });

    // this.user_service.getAuthenticatedUser().subscribe(user => {
    //   console.log(user);
    // });

    console.log(this.token_service.getUserDetails());
  }

}
