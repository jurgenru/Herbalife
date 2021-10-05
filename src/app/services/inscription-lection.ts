import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionLection {

  constructor(private http: HttpClient) { }

  post(body) {
    return this.http.post(`${environment.apiUrl}inscription-lections`, body).pipe();
  }

  get() {
    return this.http.get(`${environment.apiUrl}inscription-lections`).pipe();
  }

}
