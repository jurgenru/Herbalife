import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VirtualCardService {

  constructor(private http: HttpClient) {}

    getById(id){
      return this.http.get(`${environment.apiUrl}virtual-cards/${id}`).pipe()
    }
    post(body){ 
      return this.http.post(`${environment.apiUrl}virtual-cards`, body).pipe();
    }
    update(id, body) {
      return this.http.patch(`${environment.apiUrl}virtual-cards/${id}`, body).pipe();
    }

    getOptionsCardById(id, filter){
      return this.http.get(`${environment.apiUrl}virtual-cards/${id}/options-cards?filter=${filter}`).pipe();
    }

    delOptionsCardById(id){
      return this.http.delete(`${environment.apiUrl}/virtual-cards/${id}/options-cards`).pipe();
    }

    updateOptionsCardById(id, body) {
      return this.http.patch(`${environment.apiUrl}virtual-cards/${id}/options-cards`, body).pipe();
    }
}
