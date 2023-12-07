import { Injectable ,EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { throws } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  private URL = 'http://localhost:3000/seller';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor( private http:HttpClient , private router:Router ) { }

  userSignUp(data:SignUp){
    this.http.post(this.URL,data,{observe:'response'}).
    subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:SignIn){
    this.http.get(`http://localhost:3000/seller?Email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result:any)=>{

        if(result && result.body && result.body.length){
          console.log("user login success!")
          localStorage.setItem('seller',JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }else{
          console.log("error")
          this.isLoginError.emit(true)
        }
    })
  }

}
