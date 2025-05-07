import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../util/constant';
import { IRolResponse } from '../../model/api/response/IRolResponse';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  list(): Observable<IRolResponse[]> {
    return this.http.post<IRolResponse[]>(`${BASE_URL}/rol/list`, {});
  }
}
