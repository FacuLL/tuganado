import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  backendUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  registerRecord(body: any) {
    return this.http.post(this.backendUrl + '/record', body)
  }
}
