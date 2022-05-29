import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/models/Message';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  @Input() title = ""
  @Input() priority: string = "";
  @Input() showDisplay: boolean = false;
  @Input() data: IMessage[] = [];

  constructor() {

   }

  ngOnInit(): void {

  }

}
