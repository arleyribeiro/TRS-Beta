import { TextDialogComponent } from './text-dialog/text-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './../app-material/app-material.module';
import { TextsComponent } from './texts.component';
import { TextFormComponent } from './text-form/text-form.component';
import { TextsRoutingModule } from './texts.routing.module';
import { TextsService } from './texts.service';
import { TextProcessedComponent } from './text-processed/text-processed.component';
import { TextProcessedFrontComponent } from './text-processed-front/text-processed-front.component';
import { TextHistoricFormComponent } from './text-historic-form/text-historic-form.component';
import { TextHistoricComponent } from './text-historic/text-historic.component';
import { TextFilterByUsersComponent } from './text-filter-by-users/text-filter-by-users.component';
import { TextFilterByInconsistencyComponent } from './text-filter-by-inconsistency/text-filter-by-inconsistency.component';
import { TextSharedDialogComponent } from './text-shared-dialog/text-shared-dialog.component';
import { TextViewCorrectionsComponent } from './text-view-corrections/text-view-corrections.component';
import { TextSharedWithMeComponent } from './text-shared-with-me/text-shared-with-me.component';
import { TextLoaderComponent } from './text-loader/text-loader.component';

@NgModule({
  imports: [
    CommonModule,
    TextsRoutingModule,
    AppMaterialModule
  ],
  declarations: [
    TextsComponent,
    TextFormComponent,
    TextProcessedComponent,
    TextProcessedFrontComponent,
    TextHistoricFormComponent,
    TextHistoricComponent,
    TextFilterByUsersComponent,
    TextFilterByInconsistencyComponent,
    TextSharedDialogComponent,
    TextViewCorrectionsComponent,
    TextSharedWithMeComponent,
    TextLoaderComponent,
    TextDialogComponent
  ],
  providers: [
    TextsService
  ]
})
export class TextsModule { }
