import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Cow from '../models/cow';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  backendUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  registerCow(body: any) {
    return this.http.post(this.backendUrl + '/cow', body)
  }
}
