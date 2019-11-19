import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleResponse(data) {
    const token = data.success.token;
    this.storeToken(token);
  }

  storeToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  validateToken() {
    //if (this.getToken()) {
    //  const payload = this.payload(this.getToken());
    //}
    return this.getToken() ? true : false;
  }

  getUserDetails() {
    const token = this.getToken();
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }


  isLoggeddIn() {
    const userDetails = this.getUserDetails();
    if (userDetails) {
      return userDetails.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
