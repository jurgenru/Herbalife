
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class PromotionService {

    constructor(private http: HttpClient) { }

    post(body){ 
      return this.http.post(`${environment.apiUrl}promotions`, body).pipe();
    }

    update(id, body){
      return this.http.post(`${environment.apiUrl}promotions/${id}`, body).pipe();
    }

    get(){
      return this.http.get(`${environment.apiUrl}promotions`).pipe();
    }

}
