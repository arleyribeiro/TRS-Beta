import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulesComponent } from './rules.component';
import { RuleFormComponent } from './rule-form/rule-form.component';
import { RulesTableComponent } from './rules-table/rules-table.component';
import { RuleDialogComponent } from './rule-dialog/rule-dialog.component';

const rulesRoutes: Routes = [
    { path: '', component: RulesComponent, children: [
      { path: 'rulesAll', component: RulesTableComponent},
      { path: 'new', component:  RuleFormComponent},    
      { path: ':id', 
        component: RulesComponent
        //resolve: { user: UsersDetailsResolver}
      },
      { path: ':id/edit', 
        component: RulesTableComponent
        //canDeactivate: [UsersDeactivateGuard]
      },
      { path: 'ruleDialog', 
        component: RuleDialogComponent
        //canDeactivate: [UsersDeactivateGuard]
      }
  ]}  
];

@NgModule({
  imports: [RouterModule.forChild(rulesRoutes)],//module functionality use 'forChild'
  exports: [RouterModule]
})

export class RulesRoutingModule { }
