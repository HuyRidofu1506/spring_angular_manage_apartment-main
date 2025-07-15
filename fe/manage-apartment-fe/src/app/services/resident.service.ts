import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resident } from '../models/resident.models';

const baseUrl = 'http://localhost:8080/api/v1/residents';

@Injectable({
    providedIn: 'root'
  })

  export class ResidentService {
    constructor(private http: HttpClient) { }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    };

    getAll(): Observable<Resident[]> {
        return this.http.get<Resident[]>(baseUrl);
      };

      search(params: any): Observable<any> {
        return this.http.get<any>(baseUrl + "/_search", { params });
      }

      get(id: any): Observable<Resident> {
        return this.http.get<Resident>(`${baseUrl}/${id}`);
      };

      update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
      };

      delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
      }

  }