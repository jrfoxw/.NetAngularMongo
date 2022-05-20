import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, of, merge, Subscription  } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public static id = 0;
  public static archived: Observable<IMessage[]> = new Observable<IMessage[]>();
  public messages: Observable<IMessage[]> = new Observable<IMessage[]>();
  private api: string =  ""

  constructor(private http:HttpClient, private apiService: ApiService) {
    this.api = apiService.api;
   }

  public getMessages(): Observable<IMessage[]>{
    return this.messages;
}

  public async addMessage(user: string, text: string): Promise<Subscription>{
    console.log('Adding Message: ', user, text);
    MessageService.id += 1;
    const message: IMessage = {
        id: MessageService.id,
        user: user,
        text: text,
        date: Date.now()
    }

    console.log('Adding Message: ', user, text, message);

    return this.messages.subscribe((messages) => {
      messages.push(message)
      console.log('Messages: ', this.messages)
      return this.messages;
  });
  }

  public clearMessages(): void{

    const n = this.messages;
    MessageService.archived = merge(MessageService.archived, this.messages);
    console.log('Archiving Messages: ', MessageService.archived, this.messages);
    this.messages.subscribe((messages) => messages = []);
  }

  public getArchived(): Observable<IMessage[]> {
    console.log('Archived Messages', MessageService.archived);
    return MessageService.archived;
  }


  
}
