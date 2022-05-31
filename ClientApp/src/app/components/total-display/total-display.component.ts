import { Component, OnInit, Input } from '@angular/core';
import { ATM } from 'src/app/models/ATM';
import { ATMService } from 'src/app/services/atm.service';

@Component({
  selector: 'app-total-display',
  templateUrl: './total-display.component.html',
  styleUrls: ['./total-display.component.css']
})
export class TotalDisplayComponent implements OnInit {

  @Input("total") ATM_TOTAL_TEXT: string = "";
  constructor(private ATM: ATMService) { }

  ngOnInit(): void {
  }

  resetATM(){
    console.log("..RESETTING ATM..");
    this.ATM.setATMOnlineStatus(false);
    }
}
