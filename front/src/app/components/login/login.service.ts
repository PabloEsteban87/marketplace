import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { JwtModel } from 'src/app/models/JwtModel.model';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpClient: any;

  constructor(private http: HttpClient) { }


/* public postLogin(loginObject?: Login): Observable<Object>{
  return this.http.post<Login>('http://localhost:8000/customers/login', loginObject)
} */

public postLogin(loginObject: Login): Observable<Login> {
  return this.http.post<Login>('http://localhost:8000/customers/login', loginObject, { withCredentials: true });
}



}