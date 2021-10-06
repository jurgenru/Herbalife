import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class AppointmentService {
    constructor(private http: HttpClient) {}

  post(body) {
    return this.http.post(`${environment.apiUrl}appointments`, body).pipe();
  }
  get(filter) {
    return this.http.get(`${environment.apiUrl}appointments?filter=${filter}`).pipe();
  }
  getById(id) {
    return this.http.get(`${environment.apiUrl}appointments/${id}`).pipe();
  }
  getAppointmentsById(id) {
    return this.http.get(`${environment.apiUrl}users/${id}/appointments`).pipe();
  }
  update(id, body) {
    return this.http.patch(`${environment.apiUrl}appointments/${id}`, body).pipe();
  }
  delete(id){
    return this.http.delete(`${environment.apiUrl}appointments/${id}`).pipe();
  }
  deleteAppointmentById(id) {
    return this.http.delete(`${environment.apiUrl}users/${id}/appointments`).pipe();
  }
}
