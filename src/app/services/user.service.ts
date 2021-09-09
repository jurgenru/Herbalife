import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class UserService {
    constructor(private http: HttpClient) { }

    login(body) {
        return this.http.post(`${environment.apiUrl}users/login`, body).pipe();
    }

    me() {
        return this.http.get(`${environment.apiUrl}users/me`).pipe();
    }

    getById(id, filter) {
        return this.http.get(`${environment.apiUrl}/users/${id}?filter=${filter}`).pipe();
    }

    getBlogById(id) {
        return this.http.get(`${environment.apiUrl}/users/${id}/blogs`).pipe();
    }

    getStoreByUserId(id, filter) {
        return this.http.get(`${environment.apiUrl}/users/${id}/stores?filter=${filter}`).pipe();

    }
}