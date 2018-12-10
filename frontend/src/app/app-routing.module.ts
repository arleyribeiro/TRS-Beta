import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { UsersGuard } from './guards/users.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: '',
    pathMatch: 'full', redirectTo: 'home'
    //component: AppComponent,
    //canActivate: [AuthGuard]
  },
  { path: 'home', 
    component: HomeComponent,
    //canActivate: [AuthGuard],
    //canLoad: [AuthGuard]
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'texts',
    loadChildren: './texts/texts.module#TextsModule',
    canActivate: [AuthGuard],
    canActivateChild: [UsersGuard],
    canLoad: [AuthGuard]
  },
  { path: 'user', 
    loadChildren: './users/users.module#UsersModule',
    canActivate: [AuthGuard],
    canActivateChild: [UsersGuard],
    canLoad: [AuthGuard]
  },
  { path: 'rules', 
    loadChildren: './rules/rules.module#RulesModule',
    canActivate: [AuthGuard],
    canActivateChild: [UsersGuard],
    canLoad: [AuthGuard]
  },    
  { path: 'notifications', 
    component: NotificationComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  }, 
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
