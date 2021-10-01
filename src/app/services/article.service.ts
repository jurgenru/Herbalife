import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  post(body) {
    return this.http.post(`${environment.apiUrl}articles`, body).pipe();
  }

  update(id, body) {
    return this.http.patch(`${environment.apiUrl}articles/${id}`, body).pipe();
  }

  getById(id) {
    return this.http.get(`${environment.apiUrl}articles/${id}`).pipe();
  }

  getCommentaryById(id, filter) {
    return this.http.get(`${environment.apiUrl}articles/${id}/commentaries?filter=${filter}`).pipe();
  }

}
