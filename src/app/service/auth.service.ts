import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_SECURITY } from '../util/constant';
import { IUserRequest } from '../model/api/request/IUserRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: IUserRequest): Observable<String> {
    return this.http.post<String>(`${BASE_URL_SECURITY}/session/login`, user);
  }
}
