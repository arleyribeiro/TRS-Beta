import { Component, OnInit } from '@angular/core';

import { Users } from './users';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any[];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
   /* this.usersService.getUsers().subscribe(
      (users: any[]) =>  this.users = users
    );*/
  }

}
