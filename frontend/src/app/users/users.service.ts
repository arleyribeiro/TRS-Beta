import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }
  
  private users: any[];

  getUsers() {
    return this.http.get(this.apiRoot.concat('user/'));
  }

  getUser(id: Number){
    return this.http.get(this.apiRoot.concat('user/' + id + '/'));
  }

  postUser(user: any) {
    return this.http.post(this.apiRoot.concat('user/'), user);
  }

  postRegistrationUser(user: any) {
    return this.http.post(this.apiRoot.concat('registrationUser/'), user);
  }

  updateUser(id: Number, user: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiRoot.concat('user/' + id + '/'), user, httpOptions);
  }

  deleteUser(id: Number) {
    return this.http.delete(this.apiRoot.concat('user/' + id));
  }

}
