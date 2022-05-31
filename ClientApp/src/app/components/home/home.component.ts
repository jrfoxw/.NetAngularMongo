import { Component, Input, OnInit } from '@angular/core';
import { IMessage, Messages } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
import { ATMService } from 'src/app/services/atm.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { ATM_TRANSACTION_MODES, IATM, ATM } from 'src/app/models/ATM';
import { Denomination, DenominationsEnum, IDenomination } from 'src/app/models/Denomination';
import User from 'src/app/models/User';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public showArchived: boolean = false;
  public messageSub: Subscription = new Subscription();
  public messageData: IMessage[] = new Array<IMessage>();
  public userData: string = '';
  public ATM_TOTAL: number = 0;
  public userEntryValues: number = 0;
  public userEntryTextValue: string = '$0.00';
  public ATM_TOTAL_TEXT: string = '...updating...';
  public ATM_LIMIT = 2500;
  public ATM_CURRENCIES: IDenomination[] = [];
  public ATM_MODE: ATM_TRANSACTION_MODES = ATM_TRANSACTION_MODES.DEPOSIT;
  public atmModel: IATM;
  public atmMode: string = 'DEPOSIT';
  public messagePriorityColors = {
    ERROR: 'red',
    SYSTEM: 'green',
    USER: 'blue',
  };
  public priorityColor = 'blue';
  public denominations: IDenomination[] = [];
  public temp_denominations: IDenomination[] = [];
  public user: User;
  public errorColor: string = 'red';
  public alertActive: boolean = false;
  public alert: string = '';
  public userStatus: string = 'No Activity';

  constructor(
    private messageService: MessageService,
    private currencyService: CurrencyService,
    private ATMService: ATMService
  ) {
    this.user = new User('George', 120, this.messageService);
    this.atmModel = new ATM();
  }

  ngOnInit(): void {
    this.ProcessATM();
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  ProcessATM() {
    this.ATMService.getATM().subscribe((result) => {
      this.user.AddToUsersTotal(40);
      this.atmModel = result;
      this.ATM_TOTAL = result.totalCurrency;
      this.updateTotalView();
      this.messageService.addMessage('ATM_SYSTEM', 'SYSTEM ACTIVE');
      this.messageService.addMessage('ATM_SYSTEM', 'SET DEFAULT VALUES');
      this.messageService.addMessage('ATM_SYSTEM', '...AWAITING TRANSACTIONS...');
      this.messageService.addMessage('ATM_SYSTEM', `TOTAL IN ATM: $${this.ATM_TOTAL}.00`, 'green');
      this.messageData = this.messageService.getMessages();
    });

      this.currencyService.getCurrencies().subscribe((results) => 
      {
        this.denominations = results;
        this.temp_denominations = this.denominations;
        results.forEach(dat => {
          this.ATM_CURRENCIES.push(new Denomination(Denomination.getEnumValue(dat), dat.value, dat.amount, dat.total))
        })
        console.table(results);
        console.table(this.denominations);
        console.table(this.temp_denominations);
      }
      );
  }

  makeATMWithdraw(): void {
    this.ATM_MODE = ATM_TRANSACTION_MODES.WITHDRAW;
    this.atmMode = 'WITHDRAW';
    this.messageService.addMessage('ATM_SYSTEM', 'MODE SET TO WITHDRAW', "black");
  }

  makeATMDeposit(): void {
    this.ATM_MODE = ATM_TRANSACTION_MODES.DEPOSIT;
    this.atmMode = 'DEPOSIT';
    this.messageService.addMessage('ATM_SYSTEM', 'MODE SET TO DEPOSIT', "black");
  }

  checkATMBalance(): void {}

  checkATMTransactions(): void {}

  commitTransaction() {
    switch (this.ATM_MODE) {
      case ATM_TRANSACTION_MODES.DEPOSIT: {
        this.ATM_TOTAL += this.userEntryValues;
        this.atmModel.totalCurrency = this.ATM_TOTAL;
        console.log('Total Value: ', this.ATM_TOTAL);
        this.ATM_TOTAL_TEXT = `$${this.ATM_TOTAL}.00`;
        this.messageService.addMessage(
          'ATM_SYSTEM',
          `USER COMMITTED DEPOSIT IN AMOUNT OF: ${this.userEntryTextValue}`
        );
        this.messageService.addMessage(
          'ATM_SYSTEM',
          `TOTAL IN ATM: ${this.ATM_TOTAL_TEXT}`
        );
        this.messageData = this.messageService.getMessages();
        if(this.user.SubtractFromUsersTotal(this.userEntryValues)){
          this.ATMService.updateDenominationsFromTempDenominations();
          this.clearAll();
          this.ATMService.updateATM(this.atmModel).subscribe(result => {
            console.log("ATM UPDATED", result);
          });
          this.currencyService.updateCurrencies(this.temp_denominations).subscribe(result => {
            console.table(result);
          });
          this.showAllCurrencies();
        };
        
        break;
      }
      case ATM_TRANSACTION_MODES.WITHDRAW: {
        this.ATM_TOTAL += -this.userEntryValues;
        this.atmModel.totalCurrency = this.ATM_TOTAL;
        this.ATM_TOTAL_TEXT = `$${this.ATM_TOTAL}.00`;
        this.user.AddToUsersTotal(this.userEntryValues);
        this.messageService.addMessage(
          'ATM_SYSTEM',
          `USER COMMITTED WITHDRAW IN AMOUNT OF: ${this.userEntryTextValue}`
        );
        this.messageService.addMessage(
          'ATM_SYSTEM',
          `TOTAL DISPENSED $${this.userEntryTextValue}`
        );
        this.messageService.addMessage(
          'ATM_SYSTEM',
          `TOTAL IN ATM: ${this.ATM_TOTAL_TEXT}`
        );
        // if (this.user.SubtractFromUsersTotal(this.userEntryValues)) {
          this.currencyService.updateCurrencies(this.temp_denominations).subscribe(result => {
            console.table(result);
          });
          this.showAllCurrencies();
        //}
        this.clearAll();
        this.ATMService.updateATM(this.atmModel).subscribe(result => {
          console.log("ATM UPDATED", result);
        })
        break;
      }
      default: {
        console.error('The ATM_MODE enum does not exist.');
        break;
      }
    }
  }

  updateValue(value: number, currencyType: string): void {
    switch (this.ATM_MODE) {
      case ATM_TRANSACTION_MODES.DEPOSIT: {
        if (this.ATM_TOTAL + value < this.ATM_LIMIT) {
          // this.ATM_TOTAL += value;
          // console.log('Total Value: ', this.ATM_TOTAL);
          // this.ATM_TOTAL_TEXT = `$${this.ATM_TOTAL}.00`;
          this.userEntryValues += value;
          this.userEntryTextValue = `$${this.userEntryValues}.00`;
          this.messageService.addMessage(
            'ATM_SYSTEM',
            `USER ADDED TO DEPOSIT AMOUNT $${value}.00`
          );
          var n = this.temp_denominations.filter(x => x.value == value)
          console.log('ADDED TO DEPOSIT value: ', DenominationsEnum[value],n[0]);
          n[0].amount +=1;
          n[0].total = n[0].value * n[0].amount;
          console.table(this.temp_denominations);
          console.table(this.denominations);
          
        } else {
          this.showError(
            'ATM_SYSTEM_LIMIT_ERROR',
            `THAT DENOMINATION CANNOT BE ACCEPTED, PLEASE TRY ANOTHER DENOMINATION!`
          );
        }
        break;
      }
      case ATM_TRANSACTION_MODES.WITHDRAW: {
        // check against user total
        this.setAlert(false, '');
        if (
          this.ATM_TOTAL - value !== 0 &&
          this.userEntryValues - value !== 0
        ) {
          this.userEntryValues += value; // amount of withdraw;
          this.userEntryTextValue = `$${this.userEntryValues}.00`;
          if (this.user.totalAmountInBank > value) {
            this.messageService.addMessage(
              'ATM_SYSTEM',
              `USER ADDED TO WITHDRAW AMOUNT $${value}.00`
            );
            //this.ATMService.updateTempDenominationTotal(value, true);
            var n = this.temp_denominations.filter(x => x.value == value)
            console.log('ADDED TO WITHDRAW value: ', DenominationsEnum[value],n[0]);
            n[0].amount -=1;
            n[0].total = n[0].value * n[0].amount;
            console.table(this.temp_denominations);
            console.table(this.denominations);
          } else{
              this.messageService.addMessage(
                'ATM_SYSTEM',
                'INSUFFICIENT FUNDS FOR WITHDRAW!'
              );
              this.alert = 'INSUFFICIENT FUNDS FOR WITHDRAW!';
              this.setAlert(true, this.alert);
            }
        }

        break;
      }
      default: {
        console.error('That ATM_MODE enum does not exist.');
        break;
      }
    }

    this.messageData = this.messageService.getMessages();
  }

  addMessageToTransactionLog() {}

  clearAll() {
    this.userEntryValues = 0;
    this.userEntryTextValue = `$0.00`;
    this.ATMService.ResetTempDenominations();
  }

  updateTotalView() {
    // this.ATM_TOTAL += value;
    // console.log('Total Value: ', this.ATM_TOTAL);
    this.ATM_TOTAL_TEXT = `$${this.ATM_TOTAL}.00`;
  }

  showUserBalance() {
    this.messageService.addMessage(
      'ATM_SYSTEM_USER_BALANCE',
      `${this.user.totalAmountString}`
    );
  }

  showUserTransactions() {}

  showAllCurrencies(){
    this.messageService.addMessage("*****************","DENOMINATIONS STORED", "red");
    this.denominations.forEach(x => {
      this.messageService.addMessage("DENOMINATIONS", `TYPE: $${x.value}.00 AMOUNT: ${x.amount} TOTAL: ${x.total}`, "red");
    });
    this.messageService.addMessage("*****************","DENOMINATIONS STORED", "red");
    this.messageData = this.messageService.getMessages();
  }

  showError(fromUser: string, errorMessage: string = 'Error') {
    let v = errorMessage;
    this.priorityColor = this.messagePriorityColors.ERROR;
    this.messageService.addMessage(fromUser, errorMessage, 'red');
  }

  setAlert(alertOn: boolean, alertMessage: string) {
    this.alertActive = true;
    this.userStatus = alertMessage;
  }
}
