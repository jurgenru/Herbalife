import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class StoreService {
    constructor(private http: HttpClient) { }

    post(body) {
        return this.http.post(`${environment.apiUrl}stores`, body).pipe();
    }

    get(filter) {
        return this.http.get(`${environment.apiUrl}stores?filter=${filter}`).pipe();
    }

    getProductsById(id) {
        return this.http.get(`${environment.apiUrl}stores/${id}/products`).pipe();
    }

    getById(id) {
        return this.http.get(`${environment.apiUrl}stores/${id}`).pipe();
    }

    delete(id){
        return this.http.delete(`${environment.apiUrl}stores/${id}`).pipe();
    }

    deleteProductById(id) {
        return this.http.delete(`${environment.apiUrl}stores/${id}/products`).pipe();
    }
}