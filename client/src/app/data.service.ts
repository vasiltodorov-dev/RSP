import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient); // Modern functional injection

  getHello() {
    return this.http.get<{ message: string }>('http://localhost:3000/api/hello');
  }
}