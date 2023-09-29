import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {TokenServiceService} from '../app/services/tokenservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-comicsbooks';

  constructor(private tokenService: TokenServiceService, private router: Router) { }

  isLogin = false;
  roles: string[] | undefined;
  authority: string | undefined;

  ngOnInit(){
    if (this.tokenService.getUserName()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
  }



}
