import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../_models/invoice.model';
import { environment } from '../../environments/environment';

const URL_API = `${environment.URL_API}/invoice`;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(URL_API);
  }

  get(id: any): Observable<Invoice> {
    return this.http.get<Invoice>(`${URL_API}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(URL_API, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${URL_API}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${URL_API}/${id}`);
  }

   findByRef(ref: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${URL_API}?ref=${ref}`);
  }
}
