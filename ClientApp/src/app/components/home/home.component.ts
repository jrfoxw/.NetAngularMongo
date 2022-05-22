import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { IMessage, Messages } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription, Subject } from 'rxjs';
import { NgModel } from '@angular/forms';
//import { DataDisplayComponent } from '../data-display/data-display.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public messages: Subject<IMessage[]> = new Subject<IMessage[]>();
  public showArchived: boolean = false;
  public archived: Subject<IMessage[]> = new Subject<IMessage[]>();
  public messageSub: Subscription;
  public messageData: IMessage[] = new Array<IMessage>();
  public user: string = ""
  public userData: string = ""
  public event: string = "Adding Entry"
  public eventData: string = "Adding Entry"

  constructor(private messageService: MessageService){ 
    this.messageSub = new Subscription();
  }

  ngOnInit(): void{
    console.log('Init...')
    this.messageSub = this.messageService
      .getMessages()
      .subscribe((messages)=>{  this.messageData = messages });
  }

  ngOnChanges(): void {
    console.log("change detected...");
    // this.messageService
    //   .getMessages()
    //   .subscribe((messages)=>{  this.messages = messages });
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }
  

  addEntry(): void{
    // TODO: change to popup module.

    this.messageData.push({user: this.user, text: this.eventData, date: Date.now()});

    this.messageSub = this.messageService
      .addMessage('Add', 'Adding Entry on Button Click').
      subscribe((messages: IMessage[]) => {
        messages = this.messageData;
      }).add(console.log('New Messages Array: ',this.messageData));

  }
  removeEntry(){
    this.messageService
      .addMessage('Remove','Removing Entry on Button Click.')
    console.log(this.messages);
  }
  viewArchivedEntries(){
    //this.messages.addMessage('View','Viewing Archived Entries on Button Click.');
    console.log(this.messages);
    this.showArchived = !this.showArchived;
    this.messageService
      .getArchived()
      .subscribe((archived) => this.archived);
  }

  clearEntries(){
    this.messageService.clearMessages();
  }

  updateUser():void{
    this.user = this.userData;
    console.log(this.userData)
  }

  updateEvent(): void{
    this.event = this.eventData;
  }
}
