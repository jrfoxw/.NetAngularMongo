import { Component } from '@angular/core';
import { IMessage, Messages } from 'src/app/model/Message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public messages: Messages = new Messages();
  public showArchived: Boolean = false;
  //public archived: IMessage[] = [] ;

  constructor(){}

  addEntry(){
    this.messages.addMessage('Add', 'Adding Entry on Button Click');
    console.log(this.messages);

  }
  removeEntry(){
    this.messages.addMessage('Remove','Removing Entry on Button Click.');
    console.log(this.messages);
  }
  viewArchivedEntries(){
    this.messages.addMessage('View','Viewing Archived Entries on Button Click.');
    console.log(this.messages);
    this.showArchived = !this.showArchived;
    this.messages.getArchived();

  }

  clearEntries(){
    this.messages.clearMessages();
  }
}
