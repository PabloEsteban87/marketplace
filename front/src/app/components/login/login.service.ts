import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


public postLogin(loginObject?: Login): Observable<Object>{
  return this.http.post<Login>('http://localhost:8000/customers/login', loginObject)
}
}