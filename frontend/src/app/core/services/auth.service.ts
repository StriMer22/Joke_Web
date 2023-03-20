import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { AuthResponse } from '../app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem('token');
  }

  constructor(private apiService: UserService, private router: Router) {
    this.setup();
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: AuthResponse) => {
        this.handleToken(response);
      })
    );
  }

  register(username: string, password: string) {
    return this.apiService.register(username, password).pipe(
      tap((response: AuthResponse) => {
        this.handleToken(response);
      })
    );
  }

  handleToken(response: AuthResponse) {
    this._isLoggedIn$.next(true);
    localStorage.setItem('token', response.accessToken);
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/jokes']);
  }

  verify() {
    return this.apiService
      .verify()
      .pipe(
        catchError((_) => {
          this._isLoggedIn$.next(false);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return of(null);
        })
      )
      .subscribe();
  }

  private async setup() {
    await this._isLoggedIn$.next(!!this.token);
    if (!!this.token) {
      this.verify();
    }
  }
}
