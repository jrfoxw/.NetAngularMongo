import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from 'src/app/models/Message';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  public data : IMessage[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    // http.get<IMessage[]>(baseUrl + 'message').subscribe((data) => {
    //   console.log('Data: ', data);
    //   this.data = data;
    // }, error => {console.error(error)});
  }
}


