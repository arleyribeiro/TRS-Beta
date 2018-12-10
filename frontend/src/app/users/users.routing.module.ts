import { UsersDeactivateGuard } from '../guards/users.deactivate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersDetailsResolver } from './guards/users-details.resolver'

const usersRoutes: Routes = [
    { path: '', component: UsersComponent, children: [
      { path: 'new', component: UserFormComponent },    
      { path: ':id', 
        component: UserDetailsComponent,
        resolve: { user: UsersDetailsResolver}
     },
      { path: ':id/edit', 
        component: UserFormComponent,
        canDeactivate: [UsersDeactivateGuard]
      }
  ]}  
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],//module functionality use 'forChild'
  exports: [RouterModule]
})

export class UsersRoutingModule { }
