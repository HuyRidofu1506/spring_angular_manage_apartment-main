import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.models';

const baseUrl = 'http://localhost:8080/api/v1/apartments';

@Injectable({
    providedIn: 'root'
  })

  export class ApartmentService {
    constructor(private http: HttpClient) { }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    };

    getAll(): Observable<Apartment[]> {
      return this.http.get<Apartment[]>(baseUrl);
    };
    
      search(params: any): Observable<any> {
        return this.http.get<any>(baseUrl + "/_search", { params });
      }

      get(id: any): Observable<Apartment> {
        return this.http.get<Apartment>(`${baseUrl}/${id}`);
      };

      update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
      };

      delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
      }

  }