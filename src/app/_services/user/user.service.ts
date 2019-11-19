import { Injectable } from '@angular/core';
import { User } from '../../_models/User.model';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[];
  baseUrl: string = 'http://localhost:8000/api/v1/';
  username = new Subject<string>();

  constructor(private http: HttpClient, private token_service: TokenService) { }

  register(formData) {
    return this.http.post(`${this.baseUrl}register`, formData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  sendPasswordResetLink(email) {
    return this.http.post(`${this.baseUrl}sendPasswordResetLink`, email);
  }

  updatePassword(form) {
    return this.http.post(`${this.baseUrl}updatePassword`, form);
  }

  getAuthenticatedUser() {
    let token = this.token_service.getToken();
    console.log(token);
    return this.http.post(`${this.baseUrl}getUser`, { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' } });
  }
}

