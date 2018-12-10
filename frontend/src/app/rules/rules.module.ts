import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './../app-material/app-material.module';
import { RulesService } from './rules.service';
import { RulesRoutingModule } from './rules.routing.module';
import { RulesComponent } from './rules.component';
import { RuleFormComponent } from './rule-form/rule-form.component';
import { RulesTableComponent } from './rules-table/rules-table.component';
import { RuleDialogComponent } from './rule-dialog/rule-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    RulesRoutingModule,
    AppMaterialModule
  ],
  declarations: [
    RulesComponent,
    RuleFormComponent,
    RulesTableComponent,
    RuleDialogComponent
  ],
  providers:[
    RulesService
  ]
})
export class RulesModule { }
