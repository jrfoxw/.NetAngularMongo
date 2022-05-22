import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() color: string;
  @Output() btnClickEvent = new EventEmitter();

  constructor() {
    this.text = "default";
    this.color = "blue";
   }

   fireButton():void {
    this.btnClickEvent.emit("outgoing data");
  }

  ngOnInit(): void {
  }

}
