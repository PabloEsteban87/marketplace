import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/Customer.model';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-register-a',
  templateUrl: './register-a.component.html',
  styleUrls: ['./register-a.component.scss']
})
export class RegisterAComponent {
  selectedDniType: string = 'DNI';
  registrationForm!: FormGroup;
  newCustomer : Customer = {
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
    confirmPassword: ''
  }
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      dniType: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}[A-Z]')]],
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
      surname: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
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
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator.bind(this) });
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
<<<<<<< HEAD:front/src/app/components/register/register.component.ts

  
  registerCustomer(): void {  
    console.log("registrando");  
    if (this.registrationForm.valid) {    
=======
  registerCustomer(): void {
    if (this.registrationForm.valid) {
>>>>>>> a3b5c883ecdea191bcd52496b650b5e7d5d8a33e:front/src/app/components/register-a/register-a.component.ts
      const registrationData = this.registrationForm.value;
      this.customerService.register(registrationData).subscribe(
        (response: any) => {
          console.log('Registro realizado con éxito!:', response);
          this.router.navigate(['/comicList']);
        },
        (error: any) => {
          console.error('Error durante el registro', error);
        }
      );
    } else {
<<<<<<< HEAD:front/src/app/components/register/register.component.ts
     console.log("form invalido");
=======
>>>>>>> a3b5c883ecdea191bcd52496b650b5e7d5d8a33e:front/src/app/components/register-a/register-a.component.ts
    }
  }
}
