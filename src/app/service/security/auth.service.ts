import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../util/constant';
import { Observable } from 'rxjs';
import { UserRequest } from '../../model/api/request/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: UserRequest): Observable<String> {
    return this.http.post<String>(`${BASE_URL}/session/login`, user);
  }
}
