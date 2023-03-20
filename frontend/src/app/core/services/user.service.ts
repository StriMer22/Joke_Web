import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../app-consts';
import { AuthResponse } from '../app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient.post<AuthResponse>(ENDPOINTS.AUTH.SIGNIN, {
      username,
      password,
    });
  }

  register(username: string, password: string) {
    return this.httpClient.post<AuthResponse>(ENDPOINTS.AUTH.SIGNUP, {
      username,
      password,
    });
  }

  verify() {
    return this.httpClient.get(ENDPOINTS.AUTH.VERIFY);
  }
}
