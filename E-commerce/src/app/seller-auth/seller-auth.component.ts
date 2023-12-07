import { Component, OnInit } from '@angular/core';
import { SellService } from '../services/sell.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellService , private router:Router) { }

  ngOnInit(): void {
  }
  signUp(data:SignUp): void{
    console.log(data)
    this.seller.userSignUp(data).subscribe((result)=>{
      console.log(result)
      if(result){
        this.router.navigate(['/seller-home'])
      }
    });
  }
}
