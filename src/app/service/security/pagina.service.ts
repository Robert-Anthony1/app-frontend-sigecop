import { Injectable } from '@angular/core';
import { BASE_URL } from '../../util/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../model/api/response/UserResponse';
import { UserRequest } from '../../model/api/request/UserRequest';
import { Pagina } from '../../model/dto/Pagina';

@Injectable({
    providedIn: 'root'
})
export class PaginaService {

    constructor(private http: HttpClient) { }

    list(filter: Pagina): Observable<Pagina[]> {
        return this.http.post<UserResponse[]>(`${BASE_URL}/pagina/list`, filter);
    }

    save(filter: Pagina): Observable<Pagina> {
        return this.http.post<Pagina>(`${BASE_URL}/pagina/save`, filter);
    }

    delete(filter: Pagina): Observable<Pagina> {
        return this.http.delete<Pagina>(`${BASE_URL}/pagina/delete`, {
            body: filter
        });
    }


}
