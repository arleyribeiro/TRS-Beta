import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app-material/app-material.module';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersRoutingModule } from './users.routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from './users.service';
import { UsersDetailsResolver } from './guards/users-details.resolver';
import { UsersDeactivateGuard } from '../guards/users.deactivate.guard';

@NgModule({
    declarations: [
        UsersComponent,
        UserDetailsComponent,
        UserFormComponent
    ],
    imports: [ 
        CommonModule,
        AppMaterialModule,
        UsersRoutingModule
    ],
    exports: [],
    providers: [
        UsersService, 
        UsersDeactivateGuard,
        UsersDetailsResolver
    ],
})

export class UsersModule {} 


