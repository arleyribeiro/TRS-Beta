import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{

    return this.verifyAccess(); 
  }
  
  canLoad(route: Route) : Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess();   
  }

  private verifyAccess () {
      if (this.authService.isLoggedIn()) {
        this.authService.refreshToken();  
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['home']);  
        return false;
      }
    }
}
