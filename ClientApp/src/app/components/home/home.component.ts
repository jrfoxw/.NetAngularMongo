import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { IMessage, Messages } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
//import { DataDisplayComponent } from '../data-display/data-display.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public messages: IMessage[] = [{}];
  public showArchived: boolean = false;
  public archived: IMessage[] = [{}] ;

  constructor(private messageService: MessageService){ }

  ngOnInit(): void{
    console.log('Init...')
    this.messageService
      .getMessages()
      .subscribe((messages)=>{  this.messages = messages });
  }

  ngOnChanges(changes: SimpleChange): void {
    console.log("change detected...");
    this.messageService
      .getMessages()
      .subscribe((messages)=>{  this.messages = messages });
  }

  async addEntry(){
    await this.messageService
      .addMessage('Add', 'Adding Entry on Button Click')
      .then(()=>{
        console.log('Message Added')
      })
      .catch((error) => {"Unable to add message."});
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
}
