import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRequest } from '../model/api/request/IUserRequest';
import { Observable } from 'rxjs';
import { BASE_URL_SECURITY } from '../util/constant';
import { IUserResponse } from '../model/api/response/IUserResponse';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient,private storageService: StorageService) { }

  infoSession(): Observable<IUserResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storageService.getToken()}`
    });

    return this.http.post<IUserResponse>(`${BASE_URL_SECURITY}/session/getInfoSession`
      , {}
      , { headers });
  }
}
