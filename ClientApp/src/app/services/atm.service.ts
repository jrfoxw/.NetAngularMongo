import { Injectable } from '@angular/core';
import { Denomination } from "../models/Denomination";
import { CurrencyService } from "../services/currency.service";
import {IATM, ATM_SYSTEM_MODES, ATM_TRANSACTION_MODES} from "../models/atm"

@Injectable({
  providedIn: 'root'
})
export class ATMService implements IATM {

  public systemMode: ATM_SYSTEM_MODES =  ATM_SYSTEM_MODES.ONLINE;
    public transactionMode: ATM_TRANSACTION_MODES = ATM_TRANSACTION_MODES.DEPOSIT;
    public isOnline: boolean = true;
    private static _totalCash: number = 0;
    private static _denominations: Denomination[] = []

  constructor(private currencyService: CurrencyService) { }

  public setATMDefaults(){
    this.currencyService.setDefaults();
    ATMService._denominations = this.currencyService.denominations;
    ATMService._totalCash = this.currencyService.TotalInCurrency;
  }

  public getATMDenominations(): Denomination[]{
      return ATMService._denominations;
  }

  public getATMTotal(): number{
      return ATMService._totalCash
  }

}
