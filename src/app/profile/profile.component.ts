import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile : any = {
    Address :"",
        Avatar : "",
        Dob : "",
        Email : "",
        FirstName : "",
        LastName : "",
        Phone : ""
  };
  avatar : any;
  username : any;
  userId : any = 1;
  token : any = "";
  success : boolean = false;
  constructor(private profileService : ProfileService, private tokenStorageService : TokenStorageService, private router : Router, private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    })
  }

  ngOnInit(): void {
    console.log("ok");
    console.log(this.token)
    this.tokenStorageService.saveAccessToken(this.token);
    this.getUserProfile();
  }

  getUserProfile() {
    let token = this.tokenStorageService.getToken(TokenStorageService.accessTokenKey);
    this.profileService.getUserInfo(this.userId, token).subscribe(res => {
      this.success = true;
      let body : any = res.body;
      if(body) {
        this.username = body.username
        this.profile.Address = body.address;
        this.profile.Email = body.email;
        this.profile.FirstName = body.firstName;
        this.profile.LastName = body.lastName;
        this.profile.Phone = body.phone
      }
      this.getUserAvatar();
    }, err => {
      if(err.status){
        this.success = false;
        this.router.navigate(['/login'],{queryParams: {returnUrl : window.location.href}})
      }
    })
  }

  getUserAvatar() {
    let token = this.tokenStorageService.getToken(TokenStorageService.accessTokenKey);
    this.profileService.getUserAvatar(this.userId,token).subscribe(res => {
      let body :any = res.body;
      if(body) {
        this.avatar = body.url
      }
    }, err => {
      if(err.status == 401){
        this.router.navigate(['/login'], {queryParams: {returnUrl : window.location.href}})
      }
    })
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login?returnUrl=http://localhost:4200/profile')
  }
}
