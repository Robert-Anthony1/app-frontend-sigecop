import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../util/constant';
import { SolicitudRequest } from '../../model/api/request/SolicitudRequest';
import { SolicitudResponse } from '../../model/api/response/SolicitudResponse';


@Injectable({
    providedIn: 'root'
})
export class SolicitudService {

    constructor(private http: HttpClient) { }

    list(filter: SolicitudRequest): Observable<SolicitudResponse[]> {
        return this.http.post<SolicitudResponse[]>(`${BASE_URL}/solicitud/list`, filter);
    }

    save(filter: SolicitudRequest): Observable<SolicitudResponse> {
        return this.http.post<SolicitudResponse>(`${BASE_URL}/solicitud/save`, filter);
    }

    find(filter: SolicitudRequest): Observable<SolicitudResponse> {
        return this.http.post<SolicitudResponse>(`${BASE_URL}/solicitud/find`, filter);
    }

    delete(id: any): Observable<SolicitudResponse> {
        return this.http.delete<SolicitudResponse>(`${BASE_URL}/solicitud/delete`, {
         body: {id: id}
    });
    }

}