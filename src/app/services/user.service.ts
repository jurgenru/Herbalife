import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class UserService {
    constructor(private http: HttpClient) { }

    login(body) {
        return this.http.post(`${environment.apiUrl}users/login`, body).pipe();
    }

    register(body){
      return this.http.post(`${environment.apiUrl}users/signup`, body).pipe();
    }

    me() {
        return this.http.get(`${environment.apiUrl}users/me`).pipe();
    }

    getById(id, filter) {
        return this.http.get(`${environment.apiUrl}users/${id}?filter=${filter}`).pipe();
    }

    getBlogById(id, filter) {
        return this.http.get(`${environment.apiUrl}users/${id}/blogs?filter=${filter}`).pipe();
    }

    getStoreById(id, filter) {
        return this.http.get(`${environment.apiUrl}users/${id}/stores?filter=${filter}`).pipe();
    }

    getStatementById(id, filter) {
      return this.http.get(`${environment.apiUrl}users/${id}/statements?filter=${filter}`).pipe();
    }

    getServicesById(id, filter) {
      return this.http.get(`${environment.apiUrl}users/${id}/services?filter=${filter}`).pipe();
    }

    getTrainersById(id, filter) {
      return this.http.get(`${environment.apiUrl}users/${id}/trainers?filter=${filter}`).pipe();
    }

    getName(name, filter) {
      return this.http.get(`${environment.apiUrl}users/username/${name}?filter=${filter}`).pipe();
    }

    getProfileById(id) {
      return this.http.get(`${environment.apiUrl}users/${id}/profile`).pipe();
    }

    getPromotionById(id) {
      return this.http.get(`${environment.apiUrl}users/${id}/promotions`).pipe();
    }

    getManagerById(id) {
      return this.http.get(`${environment.apiUrl}users/${id}/manager`).pipe();
    }

    getNotificationById(id, filter) {
      return this.http.get(`${environment.apiUrl}users/${id}/notifications?filter=${filter}`).pipe();
    }

    getOrderById(id, filter) {
      return this.http.get(`${environment.apiUrl}users/${id}/orders?filter=${filter}`).pipe();
    }

    registerWithGoogle(body) {
      return this.http.post(`${environment.apiUrl}users/signup-google`, body).pipe(
        );
    }

    registerWithFacebook(body) {
      return this.http.post(`${environment.apiUrl}users/signup-facebook`, body).pipe(
        );
    }

    getInscriptionById(id) {
      return this.http.get(`${environment.apiUrl}users/${id}/inscription-services`).pipe();
    }

    getInscriptionLectionById(id) {
      return this.http.get(`${environment.apiUrl}users/${id}/inscription-lections`).pipe();
    }

    getAppointmentById(id, filter) {
      return this.http.get(`${environment.apiUrl}users/${id}/appointments?filter=${filter}`).pipe();
    }
    getBodyCompositionById(id){
      return this.http.get(`${environment.apiUrl}users/${id}/body-compositions`).pipe(); 
    }

    getVirtualCardById(id, filter){
      return this.http.get(`${environment.apiUrl}users/${id}/virtual-cards?filter=${filter}`).pipe(); 
    }

}
