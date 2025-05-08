import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../util/constant';
import { RolResponse } from '../../model/api/response/RolResponse';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  list(): Observable<RolResponse[]> {
    return this.http.post<RolResponse[]>(`${BASE_URL}/rol/list`, {});
  }
}
