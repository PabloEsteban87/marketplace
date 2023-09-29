import { Component } from '@angular/core';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { TokenServiceService } from '../../services/tokenservice.service';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';
  token: string = '';
  cookieValue: string = '';

  constructor(
    private service: LoginService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenServiceService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    /*     if (this.tokenService.getUserName()) {
      this.isLogged = true;
      this.isLoginFail = false;
     this.roles = this.tokenService.getAuthorities();
    } */
  }

  login() {
    let bodyData: Login = {
      email: this.email,
      password: this.password,
    };

    this.service.postLogin(bodyData).subscribe((resultData: any) => {
      /*   this.cookieValue = this.cookieService.get('JSESSIONID');
     
      console.log(resultData); */

      console.log(resultData);
      /*  this.tokenService.setToken(this.cookieValue);
        console.log(this.cookieValue); */

      this.tokenService.setAuthorities(this.roles);

      this.isLogged = true;
      this.isLoginFail = false;

      /*       window.location.reload(); */

      if (resultData.message == 'Email not exist') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El email no existe',
          customClass: 'custom-swal',
          showConfirmButton: true,
          width: 300,
          confirmButtonColor: 'rgba(29, 41, 81, 1)',
        });
      } else if (resultData.message == 'Login Success') {
        Swal.fire({
          title: 'Éxito',
          text: 'Logueado con éxito',
          customClass: 'custom-swal',
          showConfirmButton: true,
          width: 300,
          confirmButtonColor: '#008000',
        }).then(() => {
          this.userService.setLoggedInUsername(resultData.username);
          this.router.navigateByUrl('comicList');
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'La contraseña y el email no coinciden',
          customClass: 'custom-swal',
          showConfirmButton: true,
          width: 300,
          confirmButtonColor: '#ff0000',
        });
      }
      /*    (err: any) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = err.error.message;
      }  */
    });

    this.customerService.getCustomers(this.email).subscribe((customer: any) => {
      console.log(customer);

      this.tokenService.setUserName(this.email);
    });
  }
}
