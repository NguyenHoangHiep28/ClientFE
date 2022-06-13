import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private getUserInfoUrl = "http://localhost:8180/api/v1/resource/user/";
  private getAvatarUrl = "http://localhost:8180/api/v1/resource/avatar/"
  constructor(private http : HttpClient) { }

  getUserInfo(userId : string, token : string | null) {
    return this.http.get(this.getUserInfoUrl + userId, {
      headers : {
        "Authorization" : `Bearer ${token}`
      },
      observe : 'response'
    });
  }

  getUserAvatar(userId : string, token : string | null) {
    return this.http.get(this.getAvatarUrl + userId, {
      headers : {
        "Authorization" : `Bearer ${token}`
      },
      observe : 'response'
    });
  }

}
