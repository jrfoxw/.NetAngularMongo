import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, Subject, of, merge, Subscription, pipe, concat, combineLatest  } from 'rxjs';
import { tap, map, catchError,  } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AtmTransactionService } from './atm-transaction.service';
import { Transaction } from '../models/Transaction';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public static id = 0;
  public archived: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messages: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messageLatest: any;
  private baseURL = "";
  private data: IMessage[] = []

  constructor(
    private http:HttpClient,
    private atmTransactionService: AtmTransactionService,
    @Inject('BASE_URL') baseUrl: string
    ) {
    this.baseURL = baseUrl; 
  }

  public getMessages(): IMessage[]{
    return this.data;
}

  // TODO: Change to taking a IMessage
  public addMessage(user: string = "default", text: string = "default", priority: string = "blue"): IMessage[]{


    console.log('Adding Message => : ', user, text, priority);
    MessageService.id += 1;
    const message: IMessage = {
        messageId: MessageService.id,
        user: user,
        priority: priority,
        message: text,
        dateOfEntry: Date.now().toString()
    }
    this.messages.subscribe((x) => x.push(message));
    this.data.push(message);
    this.atmTransactionService.addTransaction(new Transaction(user, text));
    return this.data;

  }

  public clearMessages(): void{

    const n = this.messages;
    this.archived;
    console.log('Archiving Messages: ', this.archived, this.messages);
    this.messages.subscribe((messages) => messages = []);
  }


  public handleError(message: string){

  }
}
