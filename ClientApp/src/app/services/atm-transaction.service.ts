import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, Subject, of, merge, Subscription, pipe, concat, combineLatest  } from 'rxjs';
import { tap, map, catchError,  } from 'rxjs/operators';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class AtmTransactionService {

  private apiHttps: string =  "https://localhost:5001";
  private api: string = "http://localhost:5000";
  private baseURL = "";

  constructor(private http:HttpClient, private apiService: ApiService, @Inject('BASE_URL') baseUrl: string) {
    this.api = apiService.api;
    this.baseURL = baseUrl;
  }
}
