import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  constructor(private http: HttpClient) { }

  currentLocation: Coordinates;
  weather: any = 'Poland';
  url: string = 'http://api.openweathermap.org/data/2.5/weather';


  public getLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          // "this" here in the weather service is seen however currentLocation is always ""
          this.currentLocation = position.coords;
          console.log(this.currentLocation);
          this.getWeather();
          //callback(position.coords);
        },
        (failure) => {
          if (failure.message.indexOf("Only secure origins are allowed") == 0) {
            alert('Only secure origins are allowed by your browser.');
          }
        }
      );
    }

  }
  getWeather() {
    this.weather = 'Wroclaw'
    const params = new HttpParams()
      .append('lat', '' + this.currentLocation.latitude)
      .append('lon', '' + this.currentLocation.longitude)
      .append('appid', 'dd4f5208462a65c91cde34a69c850673');
    this.http.get<string>(this.url, {
      params
    }
    ).subscribe((result: any) => {
      console.log(result)
    })
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
  }
}
