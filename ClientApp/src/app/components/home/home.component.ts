import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { IMessage, Messages } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
import { ATMService } from 'src/app/services/atm.service';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription, Subject } from 'rxjs';
import { NgModel } from '@angular/forms';
import { ATM_SYSTEM_MODES, ATM_TRANSACTION_MODES } from 'src/app/models/atm';
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
  public picker: any;
  public ATM_TOTAL: number = 10;
  public userEntryValues: number = 0;
  public userEntryTextValue: string ="$0.00";
  public ATM_TOTAL_TEXT: string = "$10.00"
  public ATM_LIMIT = 2500;
  public ATM_MODE: ATM_TRANSACTION_MODES =  ATM_TRANSACTION_MODES.DEPOSIT
  public messagePriorityColors = {"ERROR": "red", "SYSTEM": "green", "USER":"blue"};
  public priorityColor = "blue";

  constructor(private messageService: MessageService, private ATM: ATMService){ 
    this.messageSub = new Subscription();
  }

  ngOnInit(): void{
    // console.log('Init...')
    // this.messageData = this.messageService
    //   .getMessages();
    this.ATM.setATMDefaults();
    this.ATM_TOTAL = this.ATM.getATMTotal();
    this.ATM_TOTAL_TEXT = "$"+this.ATM.getATMTotal.toString()+".00".padStart(2,"0");
    this.messageService.addMessage("ATM_SYSTEM", "SYSTEM ACTIVE")
    this.messageService.addMessage("ATM_SYSTEM", "SET DEFAULT VALUES")
    this.messageService.addMessage("ATM_SYSTEM", "AWAITING TRANSACTIONS...")
    this.messageData = this.messageService.getMessages();
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
  
  makeATMWithdraw(): void{
    this.ATM_MODE = ATM_TRANSACTION_MODES.WITHDRAW;
    this.messageService.addMessage("ATM_SYSTEM","MODE SET TO WITHDRAW")
  }

  makeATMDeposit(): void{

  }

  checkATMBalance(): void {

  }

  checkATMTransactions(): void {

  }

  updateValue(value: number): void{
   
    if(this.ATM_TOTAL + value < this.ATM_LIMIT){
      this.ATM_TOTAL += value;
      console.log('Total Value: ', this.ATM_TOTAL);
      this.ATM_TOTAL_TEXT = `$${this.ATM_TOTAL}.00`;

      this.userEntryValues += value;
      this.userEntryTextValue = `$${this.userEntryValues}.00`;

      this.messageService.addMessage("ATM_SYSTEM", `USER DEPOSITED $${value}.00`);
      this.messageService.addMessage("ATM_SYSTEM", `USER TOTAL ${this.userEntryTextValue}`);
      this.messageService.addMessage("ATM_SYSTEM", `TOTAL IN ATM: ${this.ATM_TOTAL_TEXT}`);
      this.messageData = this.messageService.getMessages();
    }else{
      this.priorityColor = this.messagePriorityColors.ERROR;
      this.messageService.addMessage("ATM_SYSTEM_LIMIT_ERROR", `THAT DENOMINATION CANNOT BE ACCEPTED, PLEASE TRY ANOTHER DENOMINATION!`,"red")
    }
    
  }

  addEntry(): void{
    // TODO: change to popup module.

    this.messageData.push({user: this.user, message: this.eventData, dateOfEntry: Date.now().toString()});

    // this.messageSub = this.messageService
    //   .addMessage(this.user, this.eventData).
    //   subscribe((messages: IMessage[]) => {
    //     messages = this.messageData;
    //   }).add(console.log('New Messages Array: ',this.messageData));

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
