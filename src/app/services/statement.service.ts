import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class StatementService {
    constructor(private http: HttpClient) {}

  post(body) {
    return this.http.post(`${environment.apiUrl}statements`, body).pipe();
  }
  delete(id){
    return this.http.delete(`${environment.apiUrl}statements/${id}`).pipe();
  }
  deleteStatementById(id) {
    return this.http.delete(`${environment.apiUrl}users/${id}/statements`).pipe();
  }
  get(filter) {
    return this.http.get(`${environment.apiUrl}statements?filter=${filter}`).pipe();
  }
  getById(id) {
    return this.http.get(`${environment.apiUrl}statements/${id}`).pipe();
  }
  getStatementsById(id) {
    return this.http.get(`${environment.apiUrl}users/${id}/statements`).pipe();
  }
  update(id, body) {
    return this.http.patch(`${environment.apiUrl}statements/${id}`, body).pipe();
  }
}
