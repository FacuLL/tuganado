import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  backendUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  getCows(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl + '/cow')
  }

  getCow(caravana: string): Observable<any> {
    return this.http.get<any>(this.backendUrl + '/cow/' + caravana)
  }

  registerCow(body: any) {
    return this.http.post(this.backendUrl + '/cow', body)
  }
}
