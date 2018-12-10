import { TestComponent } from './test/test.component';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';

import { AuthService } from './login/auth.service';
import { RuleFormComponent } from './rules/rule-form/rule-form.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  apiRoot: String = 'http://localhost:8000/';
  title = 'app';
  showMenu: boolean = false;

  constructor(private authService: AuthService,
              private dialog: MatDialog, 
              private titleService: Title
  ) { }

  public openModal() {
    this.dialog.open(RuleFormComponent, {width: '80%', data: {name: 'teste modal'}});
  }

  ngOnInit(): void {
    this.titleService.setTitle('TRS')
    this.authService.showMenuEmitter.subscribe (
      showMenu => this.showMenu = showMenu
    )
  }
}
