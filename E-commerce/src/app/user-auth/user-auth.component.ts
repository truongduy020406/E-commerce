import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  usernamePattern = /^[a-z]{6,32}$/i;
  userInfo = {
    userName: '',
    password: '',
    email:'',
    rememberMe: false,
  };
  constructor() { }

  ngOnInit(): void {
  }
  signUp(data:any){
    console.log(data)
  }
}
