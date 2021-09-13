import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LectionService {
  constructor(private http: HttpClient) {}

  post(body) {
      return this.http.post(`${environment.apiUrl}lections`, body).pipe();
  }

  edit(id, body) {
    return this.http.patch(`${environment.apiUrl}lections/${id}`, body).pipe();
}
  
}
