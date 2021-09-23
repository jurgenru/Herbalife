import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
@Injectable()
export class AuthService {
  constructor( ) {}

  public get loggedIn():boolean {
    return (localStorage.getItem('currentUser') !== null);
  }

}