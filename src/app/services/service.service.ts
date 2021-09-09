import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class ServiceService {
    constructor(private http: HttpClient) {}

    post(body) {
      return this.http.post(`${environment.apiUrl}services`, body).pipe();
    }
    get(filter) {
      return this.http.get(`${environment.apiUrl}services?filter=${filter}`).pipe();
    }
    getServiceById(id) {
      return this.http.get(`${environment.apiUrl}services/${id}`).pipe();
    }
    delete(id){
      return this.http.delete(`${environment.apiUrl}services/${id}`).pipe();
    }
    deleteServiceById(id) {
      return this.http.delete(`${environment.apiUrl}users/${id}/services`).pipe();
    }
}
