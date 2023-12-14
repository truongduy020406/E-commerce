import { Component, OnInit } from '@angular/core';
import { SignIn, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

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
  constructor(private user:UserService , private product : ProductService) { }

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
          }else{
            this.localCartRemoveCart();
          }
      }))
  }
  showLogin(){
    this.show=false
  }
  showSignUp(){
    this.show=true
  }

  localCartRemoveCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');  
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartdataList = JSON.parse(data);
      

      cartdataList.forEach((product:product , index:number) => {
          let cartdata:cart ={
            ...product,
            productId:product.id,
            userId
          };
          delete cartdata.id;
          setTimeout(()=>{
            this.product.addtoCart(cartdata).subscribe((result)=>{
              if(result){
                console.log("add thanh cong ban oi")
              }
            })
            if(cartdataList.length === index+1){
              localStorage.removeItem('localCart')
            }
          },500)

          
      });

    } 
    setTimeout(()=>{
      this.product.getCart(userId)
    },2000)
  }
}
