import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerUrl = 'http://localhost:8000/customers'
  constructor(private httpClient: HttpClient, private http: HttpClient) { }
  register(customer : Customer){
    return this.httpClient.post<Customer>(this.customerUrl, customer);
  }



  getCustomers(email: string) : any{
    return this.httpClient.get<any>(this.customerUrl + "/" + email);
  }
}
