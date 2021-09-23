import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor( ) {}

  public get loggedIn():boolean {
    return (localStorage.getItem('currentUser') !== null);
  }

}