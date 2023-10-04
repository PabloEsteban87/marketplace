import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogged:boolean = false;
  loggedInUsername: any;
  loggedInEmail: string = "";
  constructor(private router:Router,private customerService:CustomerService,private cartService:CartService){};
  setLogdeInEmail(email:string){
    this.loggedInEmail = email;
    this.loggedInUsername = this.customerService.getCustomer(email);    
  }
  getLoggedInEmail():string{
    return this.loggedInEmail;
  }

  setLoggedInUsername(username: string) {
    this.loggedInUsername = username;
  }

  getLoggedInUsername(): string {
    return this.loggedInUsername;
  }
  setLogged(isLog:boolean){
    this.isLogged = isLog;
  }
  getLogged(){
    return this.isLogged;
  }
  logout(){
    this.isLogged = false;
    this.loggedInEmail = "";
    this.loggedInUsername = "";
    this.cartService.removeAll();
    
    this.router.navigateByUrl('/');
  }
}
