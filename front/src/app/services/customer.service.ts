import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerRole } from '../models/CustomerRole';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerUrl = 'http://localhost:8000/customers'
   private customerUrl2 = 'http://localhost:8000/customer_role'
  
  constructor(private httpClient: HttpClient) { }
  register(customer : Customer){
    return this.httpClient.post<Customer>(this.customerUrl, customer);
  }

  registerCustomerRole(role:CustomerRole) : Observable<CustomerRole>{

    return this.httpClient.post<CustomerRole>(this.customerUrl, role);
  }
  
  getCustomer(email: string) : Observable<Customer>{
    return this.httpClient.get<Customer>(this.customerUrl + "/" + email);
  }

  getCustomers() : any{
    return this.httpClient.get<any>(this.customerUrl);
  }
}
