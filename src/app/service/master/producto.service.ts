import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../util/constant';
import { ProductoRequest } from '../../model/api/request/ProductoRequest';
import { ProductoResponse } from '../../model/api/response/ProductoResponse';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    constructor(private http: HttpClient) { }

    list(filter: ProductoRequest): Observable<ProductoResponse[]> {
        return this.http.post<ProductoResponse[]>(`${BASE_URL}/producto/list`, filter);
    }

    save(filter: ProductoRequest): Observable<ProductoResponse> {
        return this.http.post<ProductoResponse>(`${BASE_URL}/producto/save`, filter);
    }

    delete(filter: ProductoRequest): Observable<ProductoResponse> {
        return this.http.delete<ProductoResponse>(`${BASE_URL}/producto/delete`, {
            body: filter
        });
    }

}
