import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/Customer.model';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { CustomerRole } from 'src/app/models/CustomerRole';

@Component({
  selector: 'app-register-a',
  templateUrl: './register-a.component.html',
  styleUrls: ['./register-a.component.scss'],
})
export class RegisterAComponent {
  selectedDniType: string = 'DNI';
  registrationForm!: FormGroup;

  customeremail!: string;
  role: CustomerRole = {
    idrole: 1,
    idcustomer: '',
  };

  newCustomer: Customer = {
    id: 0,
    email: '',
    name: '',
    surname: '',
    dni: '',
    surname2: '',
    street: '',
    number: 0,
    stairs: '',
    gate: 0,
    floor: 0,
    letter: '',
    postalcode: 0,
    town: '',
    province: '',
    password: '',
    confirmPassword: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            ),
          ],
        ],
        dniType: ['', Validators.required],
        dni: ['', [Validators.required, Validators.pattern('[0-9]{8}[A-Z]')]],
        name: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
        surname: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
        surname2: [''],
        street: ['', [Validators.required]],
        number: [''],
        gate: [''],
        stairs: [''],
        floor: [''],
        letter: [''],
        postalcode: [''],
        town: [''],
        province: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator.bind(this) }
    );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
  registerCustomer(): void {
    this.role.idcustomer = this.registrationForm.get('email')?.value;

  /*   if (this.registrationForm.valid) { */
      const registrationData = this.registrationForm.value;

      this.customerService.register(registrationData, this.role.idrole, this.role.idcustomer).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenid@',
            text: 'Registro realizado con éxito!',
          }).then(() => {
            this.router.navigate(['/comicList']);
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error durante el registro',
          });
          console.error('Error durante el registro', error);
        }
      );
    /* } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, complete todos los campos correctamente',
      });
    } */

  /*   this.customerService
      .registerCustomerRole(this.role.idrole, this.role.idcustomer)
      .subscribe((data: any) => {
        console.log(data);
      }); */
  }
}
