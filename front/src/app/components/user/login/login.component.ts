
import { Component } from '@angular/core';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { CustomerRole } from '../../../models/CustomerRole2';
import {CustomerService} from 'src/app/services/customer.service'
import { Customer } from 'src/app/models/Customer.model';


@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  role: CustomerRole = {
    role_id: 0,
    customer_id: '',
  };

  constructor(
    private service: LoginService,
    private router: Router,
    private userService: UserService,
    private customerservice: CustomerService 
  ) { }

  login() {
    let bodyData: Login = {
      email: this.email,
      password: this.password
    }
  
    this.service.postLogin(bodyData).subscribe((resultData: any) => {
      this.customerservice.getCustomerRole().subscribe((customerrole: CustomerRole) => {
        if(customerrole.role_id == 2){
            console.log("admin")
        }
        else{
       


   
      if (resultData.message == "Email not exist") {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El email no existe',
          customClass: 'custom-swal',
          showConfirmButton: true,
          width: 300, 
          confirmButtonColor: 'rgba(29, 41, 81, 1)',
          showCancelButton: true, 
          cancelButtonText: 'Cancelar', 
          showCloseButton: true, 
          confirmButtonText: 'Registrate', 
        }).then((result) => {
          if (result.isConfirmed) {
            
            this.router.navigateByUrl('register');
          }
        });
        
      } else if (resultData.message == "Login Success") {
        Swal.fire({
        
          title: 'Bienvenid@',
          text: 'Logueado con éxito',
          customClass: 'custom-swal', 
          showConfirmButton: true,
          width: 300, 
          confirmButtonColor: '#008000',
        }).then(() => {
          this.userService.setLogdeInEmail(resultData.email);
          this.router.navigateByUrl('comicList');
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'La contraseña y el email no coinciden',
          customClass: 'custom-swal' ,
          showConfirmButton: true,
          width: 300, 
          confirmButtonColor: '#ff0000',
        });
      }
    }
    });
    });
  }
}