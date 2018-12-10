import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TextsService } from './../texts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-text-historic-form',
  templateUrl: './text-historic-form.component.html',
  styleUrls: ['./text-historic-form.component.css']
})
export class TextHistoricFormComponent implements OnInit {


  formHistoryChangesText: FormGroup; //represent the form
  dataText = null
  constructor(
    private matDialogRef: MatDialogRef<TextHistoricFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public dataSource: any,
    private formBuilder: FormBuilder,
    private textsService: TextsService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.formHistoryChangesText = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]      
    });

    this.getInfo()
  }

  getInfo() {
    if(this.dataSource.editMode && this.dataSource.idText!=null && this.dataSource.idText>0) {
      this.textsService.getTextsHistoric(this.dataSource.idText).subscribe((response:any) => {
        this.formHistoryChangesText.get('name').setValue(response.name)
        this.formHistoryChangesText.get('description').setValue(response.description)
      })
    }
  }

  removeSpace(x) {
    if(x!=null && x!='' && typeof(x) != 'undefined')
      return x.replace(/^\s+|\s+$/gm,'');
    return null
  }

  disabledSubmit() {
    let name = ""
    let description = ""
    let disabled = false
    name = this.removeSpace(this.formHistoryChangesText.get('name').value)
    description = this.removeSpace(this.formHistoryChangesText.get('description').value)
    if(name==null || name=='' || typeof(name) == 'undefined'){
      disabled = true
    }
    if(description==null || description=='' || typeof(description) == 'undefined') {
      disabled = true
    }
    return disabled
  }

  public closeModal() {
    this.matDialogRef.close();
  }

}
