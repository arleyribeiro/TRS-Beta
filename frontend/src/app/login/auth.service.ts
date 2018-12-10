import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs/';

import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();
  showErrorLoginEmitter = new EventEmitter<any>();

  private apiRoot = environment.apiRoot;
  constructor(private router: Router,
  private http: HttpClient) { }

  userIsAuthenticated() {
    return this.userAuthenticated;
  }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwt.decode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getUserId() {
    const payload = <JWTPayload> jwt.decode( this.token );
    return payload.user_id;
  }

  getUser() {
    const payload = <JWTPayload> jwt.decode( this.token );
    return payload;
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(email: string, password: string) {
    return this.http.post( this.apiRoot.concat('api-token-auth/'), { email, password })
      .subscribe(response => {
        this.setSession(response)
        this.userAuthenticated = true
        this.showMenuEmitter.emit(true);
        this.showErrorLoginEmitter.emit('')
        this.router.navigate(['texts/new'])
    },
    error => {
      this.showErrorLoginEmitter.emit(error.error)
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.showMenuEmitter.emit(false);
    this.userAuthenticated = false;
    this.router.navigate(['home']);
  }

  refreshToken() {
    if (moment().isBefore(/*this.getExpiration().subtract(1, 'days'), */this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).subscribe(response => {
        this.setSession(response);
        this.userAuthenticated = true
        this.showMenuEmitter.emit(true);
      });
    }else{
      this.userAuthenticated = false
      this.showMenuEmitter.emit(false);
      this.logout()
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();
      return true;
    } else {
      this.authService.logout();
      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
