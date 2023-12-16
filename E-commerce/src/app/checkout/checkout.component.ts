import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';
import { O_DIRECT } from 'constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice:number | undefined;
  CartData :cart[] | undefined;
  ordermsg:string | undefined;
  constructor(private product: ProductService , private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((data)=>{
      let price = 0;
      this.CartData = data;
      data.forEach((item)=>{
        if(item.quantity){
          price = price + Number(item.price * item.quantity)
        }
      })
      this.totalPrice =  price + (price/10) + 100 -(price/10);
    })
  }

  orderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData:order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.CartData?.forEach((item)=>{
        setTimeout(() => {
          item.id &&  this.product.deleteCartItems(item.id)
        }, 700);
      })
      this.product.orderNow(orderData).subscribe((data)=>{
        this.ordermsg = "Your order has been placed"
        setTimeout(() => {
          this.router.navigate(['/my-order'])
          this.ordermsg = undefined
        }, 2000);
      })
    }

   
  }
}
