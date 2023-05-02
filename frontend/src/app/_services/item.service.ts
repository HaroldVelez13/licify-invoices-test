import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../_models/item.model';
import { environment } from '../../environments/environment';

const URL_API = `${environment.URL_API}/item`;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(URL_API);
  }

  get(id: any): Observable<Item> {
    return this.http.get<Item>(`${URL_API}/${id}`);
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

 findByTitle(name: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${URL_API}?name=${name}`);
  } 
}
