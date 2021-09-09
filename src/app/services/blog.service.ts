import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  constructor(private http: HttpClient) { }

  post(body) {
    return this.http.post(`${environment.apiUrl}blogs`, body).pipe();
  }

  get(filter) {
    return this.http.get(`${environment.apiUrl}blogs?filter=${filter}`).pipe();
  }

  delete(id){
    return this.http.delete(`${environment.apiUrl}blogs/${id}`).pipe();
}

deleteArticleById(id) {
  return this.http.delete(`${environment.apiUrl}blogs/${id}//blogs/{id}/articles`).pipe();
}
}