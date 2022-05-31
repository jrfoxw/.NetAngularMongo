import { Component, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/models/Transaction';
import { AtmTransactionService } from 'src/app/services/atm-transaction.service';

@Component({
  selector: 'app-transaction-display',
  templateUrl: './transaction-display.component.html',
  styleUrls: ['./transaction-display.component.css']
})
export class TransactionDisplayComponent implements OnInit {

  public transactionsList: ITransaction[] = []
  public count: number = 0;

  constructor(private atmTransactionService: AtmTransactionService) {

   }

  ngOnInit(): void {
    this.atmTransactionService.getTransactions().subscribe(result => {
      this.transactionsList = result;
      this.count = result.length;
    })
  }

}
