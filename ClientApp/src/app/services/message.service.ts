import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, Subject, of, merge, Subscription, pipe, concat, combineLatest  } from 'rxjs';
import { tap, map,  } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public static id = 0;
  public archived: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messages: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messageLatest: any;
  private api: string =  ""

  constructor(private http:HttpClient, private apiService: ApiService) {
    this.api = apiService.api;
   }

  public getMessages(): Subject<IMessage[]>{
    return this.messages;
}

  public addMessage(user: string = "default", text: string = "default"): Subject<IMessage[]>{
    console.log('Adding Message => : ', user, text);
    MessageService.id += 1;
    const message: IMessage = {
        id: MessageService.id,
        user: user,
        text: text,
        date: Date.now()
    }

    console.log('Adding Message: ', user, text, message);
    

    return this.messages;
        

  }

  public clearMessages(): void{

    const n = this.messages;
    this.archived;
    console.log('Archiving Messages: ', this.archived, this.messages);
    this.messages.subscribe((messages) => messages = []);
  }

  public getArchived(): Observable<IMessage[]> {
    console.log('Archived Messages', this.archived);
    return this.archived;
  }


  
}
