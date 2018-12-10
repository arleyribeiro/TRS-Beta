import { RuleDialogComponent } from './../rule-dialog/rule-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../login/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RulesService } from './../rules.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { TestComponent } from '../../test/test.component';

export interface Suggestion {
  tip: any,
  id: any
}

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.css']
})

export class RuleFormComponent implements OnInit {

  formInconsistency: FormGroup; //represent the form
  roleType: string[] = ['Pública', 'Privada'];  
  suggestions: Suggestion[] = [];
  tip: string = "";
  userFake: any;
  editMode: any = false;
  error: any = []
  constructor(
    private formBuilder: FormBuilder,
    private rulesService: RulesService,
    private http: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<RuleFormComponent>, @Inject(MAT_DIALOG_DATA) public dataSource: any
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.formInconsistency = this.formBuilder.group({
      id: [null],
      user: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      pattern: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required,  Validators.maxLength(500)]],
      type: [null, Validators.required],
      isRegex: [null, Validators.required],
      regexType: [null, Validators.required],
      suggestions: [null, Validators.required]
      //passwordValidate: [null, Validators.required, Validators.minLength(6)]
    });

    this.formInconsistency.get('user').setValue( this.authService.getUserId() )
    
    if(this.dataSource!=null){
      this.editRule();
      this.editMode = true;
    }
    if(!this.editMode)
      this.formInconsistency.get('id').setValue( 0 )
  }

  setForm(data) {
    this.formInconsistency.patchValue({
        id: data.id,
        user: data.user,
        name: data.name,
        pattern: data.pattern,
        description: data.description,
        type: data.type,
        isRegex: data.isRegex,
        regexType: data.regexType,
        suggestions: data.suggestions
    })
  }

  onEnterKey() {
    this.addSuggestion();
  }

  removeSpace(x) {
      return x.replace(/^\s+|\s+$/gm,'');
  }

  addSuggestion() {
    if(this.removeSpace(this.tip).length > 0) {
      this.suggestions.push({tip: this.tip, id: 0});
      this.tip = "";
      this.formInconsistency.get('suggestions').setValue(this.suggestions);
    }
  }

  removeSuggestion(index) {
    if(this.suggestions.length) {
      if (index > -1) {
        this.suggestions.splice(index, 1);
        this.formInconsistency.get('suggestions').setValue(this.suggestions);
      }
    }
  }

  removeSuggestionDB(id) {
    this.rulesService.deleteSuggestion(id).subscribe(
      
    );
  }
  //this.rulesService.postInconsistency();

  public closeModal() {
    this.matDialogRef.close();
  }

  public editRule() {    
    this.suggestions = this.dataSource.suggestions;
    this.setForm(this.dataSource);
  }

  onSubmit() {
    //let regexType = this.formInconsistency.get('regexType').value;
    //this.formInconsistency.get('isRegex').setValue( regexType == (3 - regexType) ? true : false)
    if(this.editMode) {
      this.formInconsistency.get('user').setValue( this.authService.getUserId() )
      this.formInconsistency.get('suggestions').setValue(this.suggestions);
      this.rulesService
        .updateInconsistency(this.formInconsistency.get('id').value, this.formInconsistency.value)
          .subscribe(
            response => {
              this.dialog.open(TestComponent, {data: {
                title: 'Regra Atualizada',
                content: 'A regra foi atualizada com sucesso.',
                buttonCancel: '',
                buttonConfirm: 'Ok'
              }}) 
              this.closeModal();
          })
    }else {
      this.formInconsistency.get('user').setValue( this.authService.getUserId() )
      this.formInconsistency.get('suggestions').setValue(this.suggestions);
      this.rulesService.postInconsistency(this.formInconsistency.value).subscribe(
        (data) => {
          this.dialog.open(TestComponent, {data: {
            title: 'Nova regra adicionada',
            content: 'A nova regra foi adicionada com sucesso.',
            buttonCancel: '',
            buttonConfirm: 'Ok'
          }
        })
          this.closeModal();
      }, error => {this.error = error.error})
    }
  }

  getTip(event,tip) {
    let content = ['', '']
    let type = ['', 'VERIFY', 'TEXT', 'ISREGEX', 'REGEX', 'REGEX2', 'VISIBILITY', 'VISIBILITY_PUBLIC','VISIBILITY_PRIVATE', 'ADD_RULE']
    if(event.keyCode != 13) {
      let dialogRef = this.dialog.open(RuleDialogComponent,
      { 
        data: {
          title: 'Ajuda',
          content: '',
          buttonConfirm: 'Ok',
          buttonCancel: '',
          type: type[tip]
        }
      })
    }      
  }
}