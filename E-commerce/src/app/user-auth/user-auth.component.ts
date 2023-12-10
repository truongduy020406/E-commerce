import { Component, OnInit } from '@angular/core';
import { SignIn, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  show:boolean = true;
  authError:string = '';
  usernamePattern = /^[a-z]{6,32}$/i;
  userInfo = {
    userName: '',
    password: '',
    email:'',
    rememberMe: false,
  };
  constructor(private user:UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data:SignUp){
    this.user.userSignUp(data)
  }
  Login(data:SignIn){
      this.user.userLogin(data);
      this.user.invalidUserAuth.subscribe((result=>{
          if(result){
              this.authError = 'please enter valid user and password'
          }
      }))
  }
  showLogin(){
    this.show=false
  }
  showSignUp(){
    this.show=true
  }
}
