import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../util/constant';
import { Categoria } from '../../model/dto/Categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(private http: HttpClient) { }

    list(filter: Categoria): Observable<Categoria[]> {
        return this.http.post<Categoria[]>(`${BASE_URL}/categoria/list`, filter);
    }

    save(filter: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(`${BASE_URL}/categoria/save`, filter);
    }

    delete(filter: Categoria): Observable<Categoria> {
        return this.http.delete<Categoria>(`${BASE_URL}/categoria/delete`, {
            body: filter
        });
    }

}
