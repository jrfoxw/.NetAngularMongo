import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../models/Message';
import { Observable, Subject, of, merge, Subscription, pipe, concat, combineLatest  } from 'rxjs';
import { tap, map, catchError,  } from 'rxjs/operators';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public static id = 0;
  public archived: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messages: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messageLatest: any;
  private apiHttps: string =  "https://localhost:5001";
  private api: string = "http://localhost:5000";
  private baseURL = "";
  private data: IMessage[] = []

  constructor(private http:HttpClient, private apiService: ApiService, @Inject('BASE_URL') baseUrl: string) {
    this.api = apiService.api;
    this.baseURL = baseUrl;
   }

  public getMessages(): IMessage[]{
    // this.http.get<IMessage[]>(this.baseURL + 'message').subscribe((data) => {
    //     console.log('Data: ', data);
    //     this.data = data;
    //   }, error => {console.error(error)});
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
    console.log('Posting Message: ', message, this.baseURL)
    console.log(`Total Messages: ${this.data}`)
    this.messages.subscribe((x) => x.push(message));
    this.data.push(message);
    // this.http.post<IMessage>(this.baseURL + 'message', message).subscribe((message)=>{
    //   console.log("Posting Message", message)
    // });
            //  .pipe(catchError((error) => { console.log("Something went wrong", error)});

    //console.log('Adding Message: ', user, text, message);
    

    return this.data;

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

  public handleError(message: string){

  }
  
}
