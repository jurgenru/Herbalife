import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  post(body){
    return this.http.post(`${environment.apiUrl}orders`, body).pipe();
  }

  getById(id){
    return this.http.get(`${environment.apiUrl}orders/${id}`).pipe()
  }
}
