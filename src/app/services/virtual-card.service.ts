import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VirtualCardService {

  constructor(private http: HttpClient) {}

    post(body){ 
      return this.http.post(`${environment.apiUrl}virtual-cards`, body).pipe();
    }
}
