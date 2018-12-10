import { AuthService } from './../../login/auth.service';
import { TestComponent } from './../../test/test.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formUser: FormGroup; //represent the form
  private user: any;
  private subscribe: Subscription;
  private id: any;
  private editMode: any = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private matDialogRef: MatDialogRef<UserFormComponent>, @Inject(MAT_DIALOG_DATA) public dataSource: any
    ,private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.formUser = this.formBuilder.group({
      id: [null],
      url: [null],
      username: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      role: [null, Validators.required],
      email: [null, Validators.email],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
      //passwordValidate: [null, Validators.required, Validators.minLength(6)]
    });
    
    this.id = this.authService.getUserId()
    if(this.dataSource!=null) {
      this.usersService.getUser(this.id).subscribe(response => {
        this.setForm(response);
        this.editMode = true;
      })
    }
  }
  
  setForm(data) {
    this.formUser.patchValue({
        url: "http://localhost:8000/user/"+ data.id + "/",
        id: data.id,
        username: data.username,
        password: '',
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role
    })
  }
  
  closeDialog(){
    this.matDialogRef.close();
  }

  onSubmit() {
    if(this.editMode) {
      this.updateUser();
    }else {
      this.postUser();
    }
  }
  
  postUser() {
    this.usersService.postRegistrationUser(this.formUser.value).subscribe(
      (data:any) => data,
      error => {}
    )
  }
  
  updateUser() {
    this.usersService.updateUser(this.formUser.value['id'],this.formUser.value).subscribe(
      (data:any) => {
        this.formUser.clearValidators()     
        const dialogRef = this.dialog.open(TestComponent, {data: {title: 'Perfil atualizado',content: 'Perfil atualizado com sucesso!', buttonConfirm:'ok', buttonCancel: ''}});
        },
      error => {}
    );
  }
  
  deleteUser() {
    this.usersService.deleteUser(this.id).subscribe(
      (data:any) => {
        const dialogRef = this.dialog.open(TestComponent, {data: {title: 'Perfil excluído',content: 'Perfil excluído com sucesso!', buttonConfirm:'ok', buttonCancel: ''}});
      },
      error => {}
    );
  }

  checkPasswords() {
    let password =  this.formUser.get('password').value;
    let cPass = this.formUser.get('confirmPassword').value;
    return (cPass !== password && cPass != null) ? true : false;    
  }

  ngOnDestroy() {
    //this.subscribe.unsubscribe();
   }
}

