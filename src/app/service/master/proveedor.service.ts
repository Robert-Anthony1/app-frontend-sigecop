import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../util/constant';
import { Proveedor } from '../../model/dto/Proveedor';

@Injectable({
    providedIn: 'root'
})
export class ProveedorService {

    constructor(private http: HttpClient) { }

    list(filter: Proveedor): Observable<Proveedor[]> {
        return this.http.post<Proveedor[]>(`${BASE_URL}/proveedor/list`, filter);
    }

    save(filter: Proveedor): Observable<Proveedor> {
        return this.http.post<Proveedor>(`${BASE_URL}/proveedor/save`, filter);
    }

    delete(filter: Proveedor): Observable<Proveedor> {
        return this.http.delete<Proveedor>(`${BASE_URL}/proveedor/delete`, {
            body: filter
        });
    }

}
