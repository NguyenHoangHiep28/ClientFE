import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUri : any = "";
  constructor(private loginService : LoginService,private router : Router, private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUri = params['returnUrl']
    })
  }

  ngOnInit(): void {
  }

  auth2Login() {
    console.log(this.returnUri)
    if(!this.returnUri){
      this.returnUri = "http://localhost:4200/profile";
    }
    this.loginService.logOAuth2(this.returnUri);
  }

}
