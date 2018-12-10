import { AuthService } from './../../login/auth.service';
import { TestComponent } from './../../test/test.component';
import { MatDialog } from '@angular/material/dialog';
import { TextsService } from './../texts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-text-shared-dialog',
  templateUrl: './text-shared-dialog.component.html',
  styleUrls: ['./text-shared-dialog.component.css']
})
export class TextSharedDialogComponent implements OnInit {

  constructor(private usersService: UsersService,
    private matDialogRef: MatDialogRef<TextSharedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sharedTexts: any,
    private textsService: TextsService,
    private dialog: MatDialog,
    private authService: AuthService) { }

  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<any[]>;
  optionsUsers: any = []
  filteredUsers: any = []
  userIds: any = []
  
  ngOnInit() {
    let idUser = this.authService.getUserId()
    this.usersService.getUsers().subscribe((response:any) => {
      response.forEach(element => {
        if(element.id != idUser)
          this.options.push(element)
      });
    })
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  
  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    let filter = this.options.filter(option => (option.first_name +' ' + option.last_name + ' <' + option.email + '>')
                                    .toLowerCase().includes(filterValue))
    if(filter.length == 1)
      this.getUserEmail(filter[0])
    return filter;
  }

  getUserEmail(user) {
    this.filteredUsers.push(user)
    this.userIds.push(user.id)
    this.filteredUsers = Array.from(new Set(this.filteredUsers))//primeira opção, segunda remover email já utilizado
    this.userIds = Array.from(new Set(this.userIds))
    this.myControl.setValue("");
  }    

  removeEmailUser(index) {
    if(this.filteredUsers.length) {
      if (index > -1) {
        this.filteredUsers.splice(index, 1);
      }
    }
  }
  
  postSharedTextSelected() {
    if(this.userIds.length && this.sharedTexts.length) {
      for(let user of this.userIds) {
        for(let text of this.sharedTexts){
          text.sharedUser = user
          this.textsService.postSharedText(text).subscribe(response =>{
            //enviar email aqui
          })
        }
      }
      this.dialog.open(TestComponent, {data: {
        title: 'Compartilhamento de texto',
        content: (this.sharedTexts.length>1) ? 'Os textos foram compartilhados com sucesso.' : 'O texto foi compartilhado com sucesso.',
        buttonCancel: '',
        buttonConfirm: 'Ok'
      }})
      this.sendEmail();
    }          
  }

  sendEmail() {
    if(this.authService.isLoggedIn()) {
      let data = {
        user: this.authService.getUserId(),
        recipient_list: this.userIds
      }
      this.textsService.postSendEmail(data).subscribe( response => {
      });
    }    
  }
    
  public closeModal() {
    this.matDialogRef.close();
  }
}
