
import { UsersService } from '../users.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Users } from '../users';
import { AuthService } from '../../login/auth.service';

@Injectable()
export class UsersDetailsResolver implements Resolve< Users > {
    
    constructor(private usersServie: UsersService,
                private authService: AuthService
    ) {}
    
    resolve (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Users> | Promise<Users> | any {
        let id = this.authService.getUserId()
        return this.usersServie.getUser(id);
    }
    
}
