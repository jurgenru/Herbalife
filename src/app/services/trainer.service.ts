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
}
