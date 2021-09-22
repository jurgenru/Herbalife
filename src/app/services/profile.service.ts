import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class ProfileService {

    constructor(private http: HttpClient) { }

    post(body){ 
      return this.http.post(`${environment.apiUrl}profiles`, body).pipe();
    }

    getByuserId(id){ 
      return this.http.get(`${environment.apiUrl}profiles/userId/${id}`).pipe();
    }

    update(id, body){ 
      return this.http.patch(`${environment.apiUrl}profiles/${id}`, body).pipe();
    }

}
