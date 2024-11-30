import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.models';

const baseUrl = 'http://localhost:8080/api/v1/reports';

@Injectable({
    providedIn: 'root'
  })

  export class ReportService {
    constructor(private http: HttpClient) { }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    };

      search(params: any): Observable<any> {
        return this.http.get<any>(baseUrl + "/_search", { params });
      }

      get(id: any): Observable<Report> {
        return this.http.get<Report>(`${baseUrl}/${id}`);
      };

      update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
      };

      delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
      }

  }