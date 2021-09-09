import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class StatementService {
    constructor(private http: HttpClient) {}

  post(body) {
    return this.http.post(`${environment.apiUrl}statements`, body).pipe();
  }
  deleteById(id){
    return this.http.delete(`${environment.apiUrl}statements/${id}`).pipe();
  }
  get(filter) {
    return this.http.get(`${environment.apiUrl}statements?filter=${filter}`).pipe();
  }

}
