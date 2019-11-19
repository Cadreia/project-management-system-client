import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User.model';
import { TokenService } from '../_services/token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  private token;

  constructor(private http: HttpClient, private token_service: TokenService, private user_service: UserService) {
    this.getUser().subscribe(data => {
      console.log(`User data: ${data}`);
    });
  }

  ngOnInit() {

  }

  getUser() {
    this.token = this.token_service.getToken();
    console.log(this.token);
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);

    return this.http.post(this.user_service.baseUrl + 'getUser', { headers });
  }
}
