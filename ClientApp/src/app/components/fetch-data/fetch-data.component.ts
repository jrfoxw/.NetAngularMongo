import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from 'src/app/models/WeatherForecast';
import { IMessage } from 'src/app/models/Message';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  //public forecasts: WeatherForecast[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    http.get<IMessage[]>(baseUrl + 'message').subscribe((data) => {
      console.log('data: ',data);
    });
  }
//   constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
//     http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
//       this.forecasts = result;
//     }, error => console.error(error));
//   }
}


