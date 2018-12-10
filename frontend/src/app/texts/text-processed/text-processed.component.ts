import { TestComponent } from './../../test/test.component';
import { TextFilterByInconsistencyComponent } from './../text-filter-by-inconsistency/text-filter-by-inconsistency.component';
import { TextFilterByUsersComponent } from './../text-filter-by-users/text-filter-by-users.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextsService } from './../texts.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TextHistoricFormComponent } from '../text-historic-form/text-historic-form.component';
import { AuthService } from '../../login/auth.service';
import { TextSharedDialogComponent } from '../text-shared-dialog/text-shared-dialog.component';

@Component({
  selector: 'app-text-processed',
  templateUrl: './text-processed.component.html',
  styleUrls: ['./text-processed.component.css']
})
export class TextProcessedComponent implements OnInit {

  data: any;
  inconsistencyDetails: any;
  inputText: any;
  formText: FormGroup;
  formSave: FormGroup;
  dataHistoric: any = [];
  dataChangesInText: any = [];
  openTipMatch:any = null;
  expandChangesPainel: boolean = true;
  nextIndex = -1;  
  closeTooltip: boolean = false
  lastWordId = null
  hiddenElementNoSuggestion = false
  editText = false;
  filter = null;
  dataFilter = null;
  idText:any = null
  userId: any = null;
  private dataDetails = new BehaviorSubject("");
  private currentDetails = this.dataDetails.asObservable();
  sharedDisabled:any = true
  showSpinner = false;
  editNumber = 0

  constructor(private textsService: TextsService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.editNumber = 0
    this.userId = this.authService.getUserId()
    this.formText = this.formBuilder.group({
      editMode: false,
      idText: [null],
      content: [null],
      filter: [null],
      dataFilter: [null]
    });

    this.formSave = this.formBuilder.group({
      id: [null ,Validators.required],
      user: [null ,Validators.required],
      name: [null ,Validators.required],
      description: [Validators.required],
      text: [null ,Validators.required],
      foundInconsistencies: [null ,Validators.required]
    })

    this.textsService.currentMessage.subscribe(message => {
      this.data = message
    });

    this.currentDetails.subscribe(message => {
      this.inconsistencyDetails = message
    });
    this.expandChangesPainel = true;

    this.idText = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.data.editMode && this.idText!=null) {
      this.sharedDisabled = false
      this.setFormText(this.data.content, this.idText, true)      
      this.data.idText = this.idText

      this.checkText( this.formText.value )      
    }
  }

  checkText(dataSource) {
    this.textsService.postText( dataSource ).subscribe(
      (data: any) => {
        this.textsService.updateData(data);//shared the data
        this.dataChangesInText = data.dataChangesInText
    });
  }
 
  showData() {
    this.textsService.currentMessage.subscribe(message => this.data = message)
  }
  
  newData(data) {
    this.textsService.updateData(data);
  }
  
  updateDetails (data: any){
    this.dataDetails.next(data);
  }

  showInput(){    
  }

  resetColorInconsistency(item) {
    this.lastWordId = (this.lastWordId == null) ? item.start+''+item.end : this.lastWordId;
    document.getElementById(this.lastWordId).style.backgroundColor = '#FFFF00';
    document.getElementById(this.lastWordId).style.color = 'rgba(0,0,0,.87)';
    this.lastWordId = item.start+''+item.end
    document.getElementById(this.lastWordId).style.backgroundColor = '#eff3f9';
    document.getElementById(this.lastWordId).style.color = '#3f51b5';
  }

  openTips(id:any, item) {
    this.openTipMatch = item;
    this.closeTooltip = true
    document.getElementById(id).style.visibility = 'visible';

    this.resetColorInconsistency(item);
    this.getInconsistencyDetails(item);    
  }

  getInconsistencyDetails(item) {
    for(let inconsistency of this.data.inconsistencies){
      if(item.inconsistency_id == inconsistency.id){
        this.updateDetails(inconsistency);
        this.hiddenElementNoSuggestion = true;
      }
    }
  }

  closeTips(id:any) {
    this.closeTooltip = false;
    document.getElementById(id).style.visibility = 'hidden';
  }

  changeTipByCard(suggestion) {
    let item = this.openTipMatch;
    let id = item.start+''+item.end;
    let index = null;

    for(let i=0; i < this.data.matches.length; i++) {
      let match = this.data.matches[i];
      if( match.inconsistency_id == item.inconsistency_id &&
          match.start == item.start &&
          match.end == item.end && match.match) {
        index = i;
        break;
      }
    }

    this.resetColorInconsistency(item);
    this.changeTip(id, suggestion, item, index);
  }

  ignoreSuggestion(item, index) {
    let id = item.start+''+item.end;
    this.data.matches[index].match = false;
    this.lastWordId = null;
    document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
    document.getElementById(id).style.color = 'rgba(0,0,0,.87)';
    document.getElementById(id).className = 'none';
    this.updateDetails("")
    this.hiddenElementNoSuggestion = false
  }

  changeTip(id, suggestion, item, index) {
    this.editNumber += 1;
    this.nextIndex = index;
    this.lastWordId = null;
    this.dataChangesInText.unshift({ oldText: this.data.matches[index].content, 
                                  newText: suggestion.tip, 
                                  suggestion: suggestion.id,
                                  idxMatch: index,
                                  disabled: false,
                                  editNumber: this.editNumber
                                });
    
    this.closeTooltip = false;
    this.data.matches[index].match = false;
    this.data.matches[index].content = suggestion.tip
    this.data.matches[index].editNumber = this.editNumber;

    document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
    //document.getElementById(id).style.color = 'rgba(0,0,0,.87)';
    document.getElementById(id).style.color = this.data.matches[index].editNumber ? 'rgb(24, 125, 37)' : 'rgba(0,0,0,.87)';
    document.getElementById(id).className = 'none';
    this.updateDetails("")
    this.hiddenElementNoSuggestion = false
  }

  nextSuggestion() {
    let lenghtMatches = this.data.matches.length - 1;

    this.nextIndex += 1;

    if((this.nextIndex + 1) >= lenghtMatches)
      this.nextIndex = 0;

    for(let i=this.nextIndex; i < this.data.matches.length; i++) {
      let item = this.data.matches[i];
      if((i + 1) >= lenghtMatches && this.existInconsistency()) {
        i = 0;
        this.nextIndex = 0;
      }
      
      if(item.match) {
        this.openTipMatch = item;
        this.resetColorInconsistency(item);
        this.getInconsistencyDetails(item);
        this.nextIndex = i;
        break;
      }
      this.nextIndex++;      
    }
  }

  previousSuggestion() {
    let lenghtMatches = this.data.matches.length - 1;

    this.nextIndex -= 1;

    if((this.nextIndex) <= 0)
      this.nextIndex = lenghtMatches;

    for(let i=this.nextIndex; i >= 0; i--) {
      let item = this.data.matches[i];
      if((i - 1) < 0  && this.existInconsistency()){
        i = lenghtMatches;
        this.nextIndex = lenghtMatches;
      }
      
      if(item.match) {
        this.openTipMatch = item;
        this.resetColorInconsistency(item);
        this.getInconsistencyDetails(item);
        this.nextIndex = i;
        break;
      }
      this.nextIndex--;
    }
  }

  existInconsistency() {
    let lengthMatches = 0
    if(this.data.matches!=null)
      lengthMatches = this.data.matches.length;
    for(let i=0; i<lengthMatches; i++)
      if(this.data.matches[i].match)
        return true;
    return false;
  }

  undoChange(tip, index) {
    this.closeTooltip = false;
    this.data.matches[tip.idxMatch].match = true;
    this.data.matches[tip.idxMatch].content = tip.oldText;
    this.data.matches[tip.idxMatch].editNumber = 0;
    document.getElementById(this.data.matches[tip.idxMatch].start+''+this.data.matches[tip.idxMatch].end).style.color = 'rgba(0,0,0,.87)';

    this.removeChange(index)
  }

  removeChange(index) {
    if(this.dataChangesInText.length) {
      if (index > -1 && !this.dataChangesInText[index].disabled) {
        this.dataChangesInText.splice(index, 1);
      }
    }else {
      this.dataChangesInText = []
    }
  }

  returnTo(){
    this.router.navigate(['/texts/new']);//change route
  }

  onSubmit() {     
    this.data.editMode = true;
    let text:any = "";
    if(this.data.matches) {
      this.data.matches.forEach(item => {
        text += item.content;
      });
      this.data.content = text;
    }
    
    let changes = []
    if(this.dataChangesInText) {
      this.dataChangesInText.forEach(element => {
        if(!element.disabled) {
          changes.push({ 
            oldText: element.oldText, 
            newText: element.newText, 
            suggestion: element.suggestion,
          });
        }
      });
    }
    
    let saveText = {
      id: this.idText,
      user: this.userId,
      name: "",
      description: "",
      text: text,
      foundInconsistencies: [{
        changesInText: changes,
        foundRulesNumber: this.data.inconsistencies != null ? this.data.inconsistencies.length : 0,
        foundInconsistenciesNumber: this.data.inconsistenciesNumber,
        appliedSuggestionsNumber: changes.length
      }]
    }
    
    const dialogRef = this.dialog.open(TextHistoricFormComponent, { data: {editMode: this.data.editMode, idText: this.data.idText}});
    dialogRef.
      afterClosed()
      .subscribe(result => {
        if(result) {
          this.showSpinner = true
          saveText.name = result.name
          saveText.description = result.description
          
          if((this.idText!=null && this.data.idText!=0) && this.data.editMode) {
            this.textsService
              .updateHistoricText(this.idText, saveText)
                .subscribe((response:any) => {
                  this.data.editMode = true
                  this.setFormText(text, this.idText, true);
                  this.checkText( this.formText.value )
                  this.router.navigate(['texts/text-processed/', response.id])

                  this.showSpinner = false
                  this.dialog.open(TestComponent, {data: {
                    title: 'Revisão atualizada',
                    content: 'A revisão foi atualizada com sucesso.',
                    buttonCancel: '',
                    buttonConfirm: 'Ok'
                  }})
                })
          }else{
            this.showSpinner = true
            this.textsService
              .postHistoryChangesText(saveText)
                .subscribe((response:any) => {
                  this.data.editMode = true
                  this.setFormText(text, this.idText, true);

                  this.checkText( this.formText.value )
                  this.router.navigate(['texts/text-processed/', response.id])

                  this.showSpinner = false
                  this.dialog.open(TestComponent, {data: {
                    title: 'Revisão salva',
                    content: 'A revisão foi salva com sucesso.',
                    buttonCancel: '',
                    buttonConfirm: 'Ok'
                  }})
                })
          }          
        }
      })     
  }

  setFormText(content, idText, editMode) {
    this.formText.get('editMode').setValue(editMode)
    this.formText.get('content').setValue(content)
    if(idText!=null && idText!=0)
      this.formText.get('idText').setValue(idText)
  }

  rebuildText() {
    let text = "";
    let dataFilter = []

    for(let match of this.data.matches)
      text += match.content;   
    
    if(this.data.editMode && this.idText) {
      this.formText.get('idText').setValue(this.idText)
      this.formText.get('editMode').setValue(true)
    }

    this.formText.get('content').setValue(text)

    return this.formText.value;//;{ content: text, filter: 'USERS', dataFilter: dataFilter };    
  }

  postText() {
    if(this.data.matches) {
      let data:any = []
  
      this.textsService.currentMessageUser.subscribe(message => {
        data = message
      });
  
      this.formText.get('filter').setValue(data.filter);
      this.formText.get('dataFilter').setValue(data.dataFilter);        
      
      this.showSpinner = true
      this.textsService.postText( this.rebuildText() ).subscribe(
        (data: any) => {
          this.textsService.updateData(data);//shared the data
          this.showSpinner = false
      });
    }
  }

  disabledChangeInText() {
    if(this.dataChangesInText.length) {
      this.dataChangesInText.forEach(element => {
        element.disabled = true;
      });
    }
  }

  resubmitText() {

    let dialog2 = this.dialog.open(TestComponent, {data: {content:'Você pode verificar o seu texto novamente mantendo as regras aplicadas inicialmente ou alterar as regras iniciais. Além disso, ao verificar o texto novamente as alterações aplicadas anteriormente serão mantidas.', buttonConfirm:'Sim, eu quero selecionar outras regras', buttonCancel:'Não, eu quero verificar com as regras atuais', title:'Deseja alterar regras de revisão'}})
    
    dialog2.afterClosed().subscribe(response => {
      if(response) {
        let dialog3 = this.dialog.open(TextFilterByUsersComponent, {height:'90%'})
        dialog3.afterClosed().subscribe(response => {
          this.disabledChangeInText()
          this.postText()          
        })        
      } else if(response == false) {
        this.disabledChangeInText()
        this.postText()
      }
    })
  }

  postSharedTextSelected() {
    let text = []
    text.push({
      onwerUser: this.userId,
      sharedUser: '',
      historyChangesText: this.data.idText
    })
    this.dialog.open(TextSharedDialogComponent, { width: '80%', disableClose: true, data: text });
  }      
}



