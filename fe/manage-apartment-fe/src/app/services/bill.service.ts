import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.models';

const baseUrl = 'http://localhost:8080/api/v1/bills';

@Injectable({
    providedIn: 'root'
  })

  export class BillService {
    constructor(private http: HttpClient) { }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    };

    getAll(): Observable<Employee[]> {
        return this.http.get<Employee[]>(baseUrl);
      };

      search(params: any): Observable<any> {
        return this.http.get<any>(baseUrl + "/_search", { params });
      }

      get(id: any): Observable<Employee> {
        return this.http.get<Employee>(`${baseUrl}/${id}`);
      };

      update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
      };

      delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
      }

  }