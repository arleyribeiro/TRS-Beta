import { TextViewCorrectionsComponent } from './text-view-corrections/text-view-corrections.component';
import { TextSharedDialogComponent } from './text-shared-dialog/text-shared-dialog.component';
import { TextFilterByInconsistencyComponent } from './text-filter-by-inconsistency/text-filter-by-inconsistency.component';
import { TextFilterByUsersComponent } from './text-filter-by-users/text-filter-by-users.component';
import { TextHistoricComponent } from './text-historic/text-historic.component';
import { TextHistoricFormComponent } from './text-historic-form/text-historic-form.component';
import { TextProcessedFrontComponent } from './text-processed-front/text-processed-front.component';
import { TextProcessedComponent } from './text-processed/text-processed.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextsComponent } from './texts.component';
import { TextFormComponent } from './text-form/text-form.component';
import { TextSharedWithMeComponent } from './text-shared-with-me/text-shared-with-me.component';
import { TextDialogComponent } from './text-dialog/text-dialog.component';

const textsRoutes: Routes = [
    { path: '', component: TextsComponent, children: [
      { path: 'new', component: TextFormComponent },
      { path: 'text-processed', component: TextProcessedComponent },
      { path: 'text-processed/:id', component: TextProcessedComponent },
      { path: 'text-processed-front', component: TextProcessedFrontComponent },
      { path: 'text-historic-form', component: TextHistoricFormComponent },
      { path: 'text-historic', component: TextHistoricComponent },
      { path: 'text-filter-by-users', component: TextFilterByUsersComponent },
      { path: 'text-shared-dialog', component: TextSharedDialogComponent },
      { path: 'text-filter-by-inconsistency', component: TextFilterByInconsistencyComponent },
      { path: 'text-view-corrections', component: TextViewCorrectionsComponent },
      { path: 'text-view-corrections/:id', component: TextViewCorrectionsComponent },  
      { path: 'text-shared-with-me', component: TextSharedWithMeComponent },   
      { path: 'textDialog', component: TextDialogComponent }                  
      /*{ path: ':id', 
        component: UserDetailsComponent,
        resolve: { user: UsersDetailsResolver}
     },
      /*{ path: ':id/edit', 
        component: UserFormComponent,
        canDeactivate: [UsersDeactivateGuard]
      }*/
  ]}  
];

@NgModule({
  imports: [RouterModule.forChild(textsRoutes)],//module functionality use 'forChild'
  exports: [RouterModule]
})

export class TextsRoutingModule { }
