import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private apiRoot = environment.apiRoot;

  constructor(private http: HttpClient) { }

  getAllInconsistencies() {
    return this.http.get(this.apiRoot.concat('inconsistency/'));
  }

  postInconsistency(data) {
    return this.http.post(this.apiRoot.concat('inconsistency/'), data);
  }

  deleteInconsistency(id) {
    return this.http.delete(this.apiRoot.concat('inconsistency/' + id));
  }

  deleteSuggestion(id) {
    return this.http.delete(this.apiRoot.concat('suggestion/' + id));
  }

  updateInconsistency(id, data) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiRoot.concat('inconsistency/' + id + '/'), data, httpOptions);
  }
}
