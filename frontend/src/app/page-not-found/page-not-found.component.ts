import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService  
  ) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate([this.authService.isLoggedIn ? 'texts/new' : 'home/'])
  }

}
