import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const CLIENT_ID = "f434e46e-e434-4387-b18b-8efba36fcc8c";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `http://localhost:51719/consent?clientId=${CLIENT_ID}&returnUri=`;
  constructor(private http : HttpClient) { }

  logOAuth2(returnUri : string) {
    window.location.href = this.url + returnUri;
  }
}
