import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  constructor(private http: HttpClient) { }

  post(body) {
    return this.http.post(`${environment.apiUrl}trainers`, body).pipe();
  }

  get(filter) {
    return this.http.get(`${environment.apiUrl}trainers?filter=${filter}`).pipe();
  }

  delete(id) {
    return this.http.delete(`${environment.apiUrl}trainers/${id}`).pipe();
  }

  edit(id, body) {
    return this.http.patch(`${environment.apiUrl}trainers/${id}`, body).pipe();
  }

  getById(id) {
    return this.http.get(`${environment.apiUrl}trainers/${id}`).pipe();
  }

  getLectionById(id) {
    return this.http.get(`${environment.apiUrl}trainers/${id}/lection`).pipe();
  }
}
