import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TextsService {
  private apiRoot = environment.apiRoot;

  private dataSource = new BehaviorSubject("");
  currentMessage = this.dataSource.asObservable();

  private dataSourceUser = new BehaviorSubject("");
  currentMessageUser = this.dataSourceUser.asObservable();

  updateData(data: any) {
    this.dataSource.next(data);
  }

  updateDataUser(data: any) {
    this.dataSourceUser.next(data);
  }

  constructor(private http: HttpClient) { }

  getAllInconsistencies() {
    return this.http.get(this.apiRoot.concat('simpleProcessor/'));
  }

  getAllTextsHistoric() {
    return this.http.get(this.apiRoot.concat('historyChangesText/'));
  }

  getTextsHistoric(id) {
    return this.http.get(this.apiRoot.concat('historyChangesText/' + id + '/'));
  }

  getNotifications(id) {
    return this.http.get(this.apiRoot.concat('sharedTexts/' + id +'/getNotifications/'))
  }

  getTextsSharedWithMe(id) {
    return this.http.get(this.apiRoot.concat('sharedTexts/'+ id + '/textSharedWithMe/'))
  }

  getSharedWithMe(id) {
    return this.http.get(this.apiRoot.concat('sharedTexts/'+ id + '/sharedWithMe/'))
  }

  postText(data) {
    return this.http.post(this.apiRoot.concat('simpleProcessor/'), data);
  }

  postHistoryChangesText(data) {
    return this.http.post(this.apiRoot.concat('historyChangesText/'), data);
  }

  postSendEmail(data) {
    return this.http.post(this.apiRoot.concat('sendEmail/'), data);
  }

  postSharedText(data) {
    return this.http.post(this.apiRoot.concat('sharedTexts/'), data);
  }

  deleteHistoricText(id) {
    return this.http.delete(this.apiRoot.concat('historyChangesText/' + id + '/'));
  }

  deleteSharedText(id) {
    return this.http.delete(this.apiRoot.concat('sharedTexts/' + id + '/'));
  }

  deletePostSharedText(id:any, data:any) {
    return this.http.post(this.apiRoot.concat('sharedTexts/' + id + '/deleteSharedTexts/'), {idTexts:data});
  }

  updateHistoricText(id, data) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiRoot.concat('historyChangesText/' + id + '/'), data, httpOptions);
  }

  updateSharedText(id, data) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiRoot.concat('sharedTexts/' + id + '/'), data, httpOptions);
  }
}
