import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRequest } from '../model/api/request/IUserRequest';
import { Observable } from 'rxjs';
import { BASE_URL_SECURITY } from '../util/constant';
import { IUserResponse } from '../model/api/response/IUserResponse';
import { getToken } from '../util/methods';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }

  infoSession(): Observable<IUserResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${getToken()}`
    });

    return this.http.post<IUserResponse>(`${BASE_URL_SECURITY}/session/getInfoSession`
      , {}
      , { headers });
  }
}
