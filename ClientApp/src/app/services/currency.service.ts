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
  public TotalInCurrency = 0;
  public data: Observable<IDenomination[]> = new Observable<IDenomination[]>();
  public currencies: IDenomination[] = [];


  constructor(private http:HttpClient, private apiService: ApiService, @Inject('BASE_URL') baseUrl: string) {
    this.api = apiService.api;
    this.baseURL = baseUrl;
  }

  public getCurrenciesAndSetDefaultValues(){
    return this.getCurrencies().subscribe(
      (response: IDenomination[]) => { this.currencies = response; },
      (error: any) => {console.error("Error has occurred",error)},
      () => {
        console.log("Retrieved Denominations: ", this.currencies);
        this.setDefaults(this.currencies);
      }
    );
  }

  public getCurrencies(): Observable<IDenomination[]>{
    return this.http.get<IDenomination[]>(this.baseURL + 'currency')
      // .subscribe((result: IDenomination[]) => {
      //   this.currencies = result;
      //   this.setDefaults();
      //   console.log("Getting Currencies... ", this.currencies)
        //return result;
      // this.data
      //   .subscribe(x => {
      //     this.currencies = x;
      //     console.log("Getting Currencies... ", result)
      //     return result;
      //   });
    //}, error  => {console.error("Failed to get currencies from api.")})
    //return this.currencies;
  }

  public updateCurrencies(denominations: IDenomination[]): Observable<IDenomination[]>{
    console.log('PUT REQUEST => DENOMINATIONS: ', denominations);
    return this.http.put<IDenomination[]>(this.baseURL + 'currency', denominations)
  }

  public async setDefaults(data: IDenomination[]){

    // return await this.getCurrencies()
    //   .then((result) =>
    //     {
    //       console.log('Currencies Result: ', result);
    //       return result;
    //     })
    //   .catch(error => console.error('There was an error: ', error.message));

    // this.http.get<IMessage[]>(this.baseURL + 'message').subscribe((data) => {
    //     console.log('Data: ', data);
    //     this.data = data;
    //   }, error => {console.error(error)});

    // return this.http.get<IDenomination[]>(this.baseURL + 'currency').subscribe((data) => {
    //     console.log('Data: ', data);
    //     this.data = data;
    //     data.forEach(dat => {
    //       this.denominations.push(new Denomination(Denomination.getEnumValue(dat), dat.value, dat.amount, dat.total))
    //       this.TotalInCurrency +=  Denomination.getEnumValue(dat) * dat.amount;
    //     })
    //     console.log('Data Updated: ', this.TotalInCurrency);
    //     return this.TotalInCurrency;
    //   }, error => {console.error(error)});

      console.log("Setting Defaults: ", data)

      data.forEach(dat => {
        console.log('Currency Data: ',dat);
        this.denominations.push(new Denomination(Denomination.getEnumValue(dat), dat.value, dat.amount, dat.total))
        this.TotalInCurrency +=  Denomination.getEnumValue(dat) * dat.amount;
      })

      console.log("Setting Defaults Total Currency: ", this.TotalInCurrency);
    }
  }
