import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRequest } from '../../model/api/request/IUserRequest';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../util/constant';
import { IUserResponse } from '../../model/api/response/IUserResponse';
import { StorageService } from '../util/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient, private storageService: StorageService) { }

  infoSession(): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${BASE_URL}/session/getInfoSession`, {});
  }
}
