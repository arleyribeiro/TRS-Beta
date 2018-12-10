import { TestComponent } from './../../test/test.component';
import { UserFormComponent } from './../user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: any;
  subscribe: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.subscribe = this.route.data.subscribe(
      (info) => {
        this.user = info.user;//info.user, user come user-details-resolve
      });
  }

  openDeleteModal() {
    const dialogRef = this.dialog.open(TestComponent, {data: {title: 'Excluir conta', content: 'Você tem certeza que deseja excluir a sua conta?', buttonConfirm: 'Sim, eu tenho certeza', buttonCancel: 'Cancelar'}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) { 
        this.usersService.deleteUser( this.authService.getUserId() ).subscribe(result => {
          this.authService.logout();
        });
      }
    });
  }  
  
  //simular storage
  //redirect page to edit
  editUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {width: '30%', data: this.user});
  }
  
  ngOnDestroy() {
   this.subscribe.unsubscribe();
  }
}
