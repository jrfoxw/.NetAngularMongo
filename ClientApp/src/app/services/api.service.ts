import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiBase = "http://localhost:";
  public port = "5000";
  public api = this.apiBase + this.port;

  constructor() { }
  
}
