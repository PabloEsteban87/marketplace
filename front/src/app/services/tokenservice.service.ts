import { Injectable } from '@angular/core';

/* import {JwtModel} from '../models/JwtModel.model' */

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root',
})
export class TokenServiceService {
  roles: Array<string> = [];

  constructor() {

  }



  public setUserName(email: string): void {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, email);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string[]): void {
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    let item = sessionStorage.getItem(AUTHORITIES_KEY);
    if (item !== null && item !== undefined) {
      this.roles.push(item);
    
    }
    else{
      console.log('AUTHORITIES_KEY no existe en el sessionStorage')
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
