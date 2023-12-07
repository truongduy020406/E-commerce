import { Component, OnInit } from '@angular/core';
import { SellService } from '../services/sell.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  showLogin = true;
  authError = '';


  usernamePattern = /^[a-z]{6,32}$/i;
  userInfo = {
    userName: '',
    password: '',
    email:'',
    rememberMe: false,
  };
  constructor(private seller:SellService , private router:Router) { }

  
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data:SignUp): void{
    this.seller.userSignUp(data)
  }
  signiN(data:SignUp): void{
    this.authError = ""
    this.seller.userLogin(data)
    console.log(data)
    this.seller.isLoginError.subscribe((error)=>{
        if(error){
          this.authError = "Email and password is not connect"
        }
    })
  }

  OpensignIn(){
      this.showLogin = false
      this.userInfo.email='';
      this.userInfo.password=''
      this.userInfo.userName=''
  }
  OpensignUp(){
    this.showLogin = true
    this.userInfo.email='';
    this.userInfo.password=''
    this.userInfo.userName=''
}


}
