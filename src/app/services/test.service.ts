import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TestService {
    data: any;
    constructor(private http: HttpClient) {
        http.get("../../assets/js/test.json").subscribe(res => {
            this.data = res;
        });
    }
}