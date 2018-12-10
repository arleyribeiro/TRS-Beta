import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { UsersService } from './../users/users.service';
import { ErrorStateMatcher } from '@angular/material';
import { retry } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  showSpinner = false;
  formUser: FormGroup; //represent the form
  error:any = []
  matcher = new MyErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.formUser = this.formBuilder.group({
      username: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      role: [null, Validators.required],
      email: [null, Validators.email],
      password: [null, [Validators.required]],
      confirmPassword: [null]
    });
    this.formUser.get('role').setValue(1)
  }

  checkPasswords() {
    let password =  this.formUser.get('password').value;
    let cPass = this.formUser.get('confirmPassword').value;
    return (cPass !== password && cPass != null) ? true : false;    
  }

  checkPasswords1(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? false : { notSame: true }
  }

  setForm(data) {
    this.formUser.patchValue({
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role
    })
  }

  onSubmit() {
      this.postUser();    
  }
  
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }
  
  postUser() {
    this.showSpinner = true;
    this.usersService.postRegistrationUser(this.formUser.value).subscribe(
      (data:any) => {
        let email = this.formUser.get('email').value
        let password = this.formUser.get('password').value

        if(email && password)
          this.authService.login(email,password)

        this.showSpinner = false;
        //this.formUser.reset('')
      },
      error => {
        this.error = error.error
        this.showSpinner = false;
      }
    )
  }
  disabled() {    
    let password =  this.formUser.get('password').value;
    let cPass = this.formUser.get('confirmPassword').value
    if(!this.formUser.invalid)
      if(password === cPass)
        return false
    return true
  }
}
