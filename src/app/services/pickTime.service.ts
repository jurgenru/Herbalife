import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PicktimeService {
    data: any;
    constructor(private http: HttpClient) {
        http.get("../../assets/js/pickTime.json").subscribe(res => {
            this.data = res;
        });
    }
}
