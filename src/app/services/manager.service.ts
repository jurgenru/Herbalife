import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class ManagerService {
    constructor(private http: HttpClient) {}

    post(body) {
        return this.http.post(`${environment.apiUrl}managers`, body).pipe();
    }

    getByUserId(id) {
        return this.http.get(`${environment.apiUrl}managers/user/${id}`).pipe();
    }

    edit(id, body){
        return this.http.patch(`${environment.apiUrl}managers/${id}`, body).pipe();
    }

}