import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../util/constant';
import { RolResponse } from '../../model/api/response/RolResponse';
import { RolRequest } from '../../model/api/request/RolRequest';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  list(filter: RolRequest): Observable<RolResponse[]> {
    return this.http.post<RolResponse[]>(`${BASE_URL}/rol/list`, filter);
  }

  find(filter: RolRequest): Observable<RolResponse> {
    return this.http.post<RolResponse>(`${BASE_URL}/rol/find`, filter);
  }

  save(filter: RolRequest): Observable<RolResponse> {
    return this.http.post<RolResponse>(`${BASE_URL}/rol/save`, filter);
  }

  delete(filter: RolRequest): Observable<RolResponse> {
    return this.http.delete<RolResponse>(`${BASE_URL}/rol/delete`, {
      body: filter
    });
  }

}
