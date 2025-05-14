import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../util/constant';
import { EstadoSolicitud } from '../../model/dto/EstadoSolicitud';


@Injectable({
    providedIn: 'root'
})
export class EstadoSolicitudService {

    constructor(private http: HttpClient) { }

    list(filter: EstadoSolicitud): Observable<EstadoSolicitud[]> {
        return this.http.post<EstadoSolicitud[]>(`${BASE_URL}/estado_solicitud/list`, filter);
    }

    save(filter: EstadoSolicitud): Observable<EstadoSolicitud> {
        return this.http.post<EstadoSolicitud>(`${BASE_URL}/estado_solicitud/save`, filter);
    }

    delete(filter: EstadoSolicitud): Observable<EstadoSolicitud> {
        return this.http.delete<EstadoSolicitud>(`${BASE_URL}/estado_solicitud/delete`, {
            body: filter
        });
    }

}