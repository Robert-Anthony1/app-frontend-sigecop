import { Injectable } from '@angular/core';
import { IUserResponse } from '../../model/api/response/IUserResponse';
import { BASE_URL } from '../../util/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserRequest } from '../../model/api/request/IUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  list(filter: IUserRequest): Observable<IUserResponse[]> {
    return this.http.post<IUserResponse[]>(`${BASE_URL}/usuario/list`, filter);
  }
}
