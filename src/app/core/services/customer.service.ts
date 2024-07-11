import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000';
  constructor(private _HttpClient:HttpClient) { }

  getCustomer():Observable<any>{
    return this._HttpClient.get(`./db/db.json`);
  }


}
