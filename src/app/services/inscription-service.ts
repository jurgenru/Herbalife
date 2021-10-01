import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  post(body) {
    return this.http.post(`${environment.apiUrl}inscription-services`, body).pipe();
  }

}
