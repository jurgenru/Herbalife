import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

//   post(body) {
//     return this.http.post(`${environment.apiUrl}products`, body).pipe();
//   }
//   update(id, body) {
//     return this.http.patch(`${environment.apiUrl}products/${id}`, body).pipe();
//   }
}
