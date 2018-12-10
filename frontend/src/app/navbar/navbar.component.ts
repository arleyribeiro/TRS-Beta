import { UsersService } from './../users/users.service';
import { AuthService } from './../login/auth.service';
import { Router } from '@angular/router';
import { RuleFormComponent } from './../rules/rule-form/rule-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TextsService } from '../texts/texts.service';
import { NotificationComponent } from '../notification/notification.component';
import { interval } from 'rxjs';
import { UserFormComponent } from '../users/user-form/user-form.component';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,
              private textsService: TextsService,
              private dialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              private usersService: UsersService
  ) {}
  
  private userId:any;
  user: any = {
    first_name: '',
    last_name: '',
    email: ''
  };
  expandChangesPainel = true
  notifications: any = [];
  private showMenu:any = false;
  private subscribe:any
  name: any
  ngOnInit() {

    this.authService.showMenuEmitter.subscribe (
      showMenu => {
        this.showMenu = showMenu
        if(this.showMenu && this.authService.isLoggedIn()) {
          this.userId = this.authService.getUserId(); 
          //this.getNotifications();
          const source = interval(30000)
          this.subscribe = source.subscribe(val => {
            if(this.authService.isLoggedIn()) {
              this.getNotifications();
            }else {
              this.subscribe.unsubscribe()
            }
          });
          if(!this.authService.isLoggedIn()) {
            this.subscribe.unsubscribe()
          }
          this.getUser()
        }
      }
    )
  }

  getUser() {
    this.usersService.getUser(this.userId).subscribe(response => {
      this.user = response;
      let lastNamesLength = this.user.last_name.split(' ').length
      this.name = this.user.first_name + ' ' + this.user.last_name.split(' ')[lastNamesLength - 1]
    })
    return this.user;
  }

  getShowMenu() {
    return this.showMenu
  }
  
  userDetails() {
    this.router.navigate(['user/' + this.userId + '/'])
  }
  getNotifications() {//esse id virá do usuário logado
    if(this.authService.isLoggedIn) {
      this.textsService.getNotifications(this.userId).subscribe(response =>{
        this.notifications = response
      },
      error => {
        this.dialog.open(TestComponent, {data: {title: "Ocorreu um erro", content: "Ocorreu um erro na conexão com o servidor, verifique sua internet.", buttonConfirm: "Ok", butonCancel: ""}})
        this.authService.logout()
      })
    }
  }

  showNotifications() {
    this.dialog.open(NotificationComponent,{data: this.notifications, width:"80%"})
  }

  addInconsistency() {
    const dialogRef = this.dialog.open(RuleFormComponent, {width: '90%'});
    dialogRef
        .afterClosed()
            .subscribe(result => {
                //this.router.navigate(["/rules/rulesAll"])
            });
  }

  logout() {
    this.authService.logout()
  }

  editUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {width: '30%', data: true});
  }
  
}
