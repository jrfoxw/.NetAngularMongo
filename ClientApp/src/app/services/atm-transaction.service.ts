import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, Subject, of, merge, Subscription, pipe, concat, combineLatest  } from 'rxjs';
import { tap, map, catchError,  } from 'rxjs/operators';
import { CurrencyService } from './currency.service';
import { MessageService } from './message.service';
import { ITransaction } from '../models/Transaction';
@Injectable({
  providedIn: 'root'
})
export class AtmTransactionService {


  private baseURL: string = "";
  public transactions: ITransaction[] = [];

  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private currencyService: CurrencyService,
    ) {

        this.baseURL = baseUrl;
  }

  addTransaction(transaction: ITransaction){
    this.transactions.push(transaction);
    console.log("Transactions LOG: ", this.transactions);
    
  }

  getTransactions(){
    return this.http.get<ITransaction[]>(this.baseURL + 'transaction');
  }

  postTransactions(transactions: ITransaction[]){
    return this.http.post<ITransaction[]>(this.baseURL + 'transaction',transactions );
  }

  submitTransactions(){
    this.postTransactions(this.transactions).subscribe();
  }

  deleteTransaction(){

  }


}
