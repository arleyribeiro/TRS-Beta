import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  hide = true;
  showSpinner = false;
  error:any = []
  public user: any = {email:'', password:''}

  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
  }

  doLogin() {
    this.showSpinner = true;
    this.authService.login(this.user.email, this.user.password);
    this.authService.showErrorLoginEmitter.subscribe (
      response => {
        this.showSpinner = false;
        this.error = response;
      }
    )
  }
}
