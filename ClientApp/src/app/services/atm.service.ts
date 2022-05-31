import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Denomination, DenominationsEnum, IDenomination } from "../models/Denomination";
import { CurrencyService } from "../services/currency.service";
import { IATM, ATM_SYSTEM_MODES, ATM_TRANSACTION_MODES, ATM } from "../models/ATM"
import { MessageService } from './message.service';
import { Observable, Subscription } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class ATMService implements IATM {

    public systemMode: ATM_SYSTEM_MODES =  ATM_SYSTEM_MODES.ONLINE;
    public transactionMode: ATM_TRANSACTION_MODES = ATM_TRANSACTION_MODES.DEPOSIT;
    public isOnline: boolean = true;
    public maintenanceTime: string = "";
    public maxCurrency: number = 0;
    public totalCurrency: number = 0;
    public totalDeposits: number = 0;
    public totalWithdraws: number = 0;
    public unitName: string = "";
    public atmModel: IATM = new ATM();
    private static _ATM_LIMIT = 2500;
    private static _totalCash: number = 0;
    private static _denominations: Denomination[] = []
    private static _tempDenominations: Denomination[] = []
    private baseURL: String = "";
  

  constructor(
    @Inject('BASE_URL') baseUrl: String,
    private http: HttpClient, 
    private currencyService: CurrencyService, 
    private messageService: MessageService) {

        this.baseURL = baseUrl;
     }

  public async setATMDefaults(): Promise<void>{
   
    //ATMService._denominations = this.currencyService.denominations;
    this.currencyService.setDefaults(ATMService._denominations);
    ATMService._totalCash = this.currencyService.TotalInCurrency;
    ATMService._tempDenominations = ATMService._denominations;
    console.log("ATM TOTAL: ", ATMService._denominations, ATMService._totalCash);
  }

  public getATM(): Observable<IATM>{
    return this.http.get<IATM>(this.baseURL + 'atm');
  }

  public updateATM(atm: IATM): Observable<IATM>{
    return this.http.patch<IATM>(this.baseURL + 'atm', atm);
  }

  public setATMOnlineStatus(online: boolean){
    this.getATM().subscribe(result => {
      result.isOnline = online;
      console.log("ATM: ", result);
      this.updateATM(result).subscribe();
    })
  }

  public async getATMDenominations(){
      return this.currencyService.getCurrencies().subscribe(
        (response: IDenomination[]) => { ATMService._denominations = response; },
        (error: any) => {console.error("Error has occurred",error)},
        () => {
          console.log("Retrieved Denominations: ", ATMService._denominations);
          //this.currencyService.setDefaults(ATMService._denominations);
          
        }
      );
        // .then(x =>  {
        //   console.log("Getting ATM DENOMS: ", x);
        //   //ATMService._totalCash = x[2].total;
        // });
  }

  public getATMTotal(): number{
      ATMService._totalCash = this.currencyService.TotalInCurrency;
      return ATMService._totalCash
  }

  // public updateATMDenominations(currency: Denomination[]){
  //   currency.forEach(x => {
  //     switch(x.name){
  //       case DenominationsEnum.ONES: {
  //         x.updateAmount();
  //         x.updateTotal(1)
  //         break;
  //       }
  //       case DenominationsEnum.FIVES: {
  //         this.updateDenominationTotal(DenominationsEnum.FIVES);
  //         break;
  //       }
  //       case DenominationsEnum.TENS: {
  //         this.updateDenominationTotal(DenominationsEnum.TENS);
  //         break;
  //       }
  //       case DenominationsEnum.TWENTIES: {
  //         this.updateDenominationTotal(DenominationsEnum.TWENTIES);
  //         break;
  //       }
  //       case DenominationsEnum.FIFTIES: {
  //         this.updateDenominationTotal(DenominationsEnum.FIFTIES);
  //         break;
  //       }
  //       case DenominationsEnum.HUNDREDS: {
  //         this.updateDenominationTotal(DenominationsEnum.HUNDREDS);
  //         break;
  //       }
  //     }
  //   })
  // }

  public updateTempDenominationTotal(value: DenominationsEnum, subtract: boolean){

    console.log('Update Value Denom ==> ', value);
    var n = ATMService._denominations.find(x => x.value == value);
    console.log('Denomination to update: ', n);
    if(subtract){
      n?.updateAmount(-1);
      n?.updateTotal(-value);
    }else {
      n?.updateAmount(1);
      n?.updateTotal(value);
    }
    console.log('Total Denominations: ', ATMService._denominations);
  }

  updateDenominationsFromTempDenominations(){
    //

  }

  ResetTempDenominations(){
    ATMService._tempDenominations = ATMService._denominations;
    console.log("ATM DENOMINATIONS SET: ", ATMService._tempDenominations, ATMService._denominations);
  }
}
