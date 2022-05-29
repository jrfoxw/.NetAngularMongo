import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, Subject, of, merge, Subscription, pipe, concat, combineLatest  } from 'rxjs';
import { tap, map, catchError,  } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Denomination, DenominationsEnum, IDenomination } from '../models/Denomination';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiHttps: string =  "https://localhost:5001";
  private api: string = "http://localhost:5000";
  private baseURL = "";
  public denominations: IDenomination[] = [];
  public TotalInCurrency: number = 0;


  constructor(private http:HttpClient, private apiService: ApiService, @Inject('BASE_URL') baseUrl: string) {
    this.api = apiService.api;
    this.baseURL = baseUrl;
  }

  public setDefaults(){
    this.denominations.push(new Denomination(DenominationsEnum.ONES, 10))
    this.denominations.push(new Denomination(DenominationsEnum.FIVES, 10))
    this.denominations.push(new Denomination(DenominationsEnum.TENS, 10))
    this.denominations.push(new Denomination(DenominationsEnum.TWENTIES, 10))
    this.denominations.push(new Denomination(DenominationsEnum.FIFTIES, 10))
    this.denominations.push(new Denomination(DenominationsEnum.HUNDREDS, 10))

    this.TotalInCurrency += DenominationsEnum.ONES * 10;
    this.TotalInCurrency += DenominationsEnum.FIVES * 10;
    this.TotalInCurrency += DenominationsEnum.TENS * 10;
    this.TotalInCurrency += DenominationsEnum.TWENTIES * 10;
    this.TotalInCurrency += DenominationsEnum.FIFTIES * 10;
    this.TotalInCurrency += DenominationsEnum.HUNDREDS * 10;

    console.log("Total Currency: ", this.TotalInCurrency);

  }
}
