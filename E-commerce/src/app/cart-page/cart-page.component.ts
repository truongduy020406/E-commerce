import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSumary, product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSumary:priceSumary={
    price: 0,
    discount:0,
    tax: 0,
    delivery: 0,
    total:0
  }
  constructor(private product: ProductService , private router:Router) { }
  
  ngOnInit(): void {
    this.product.currentCart().subscribe((data)=>{
      this.cartData = data
      let price = 0;
      data.forEach((item)=>{
        if(item.quantity){
          price = price + Number(item.price * item.quantity)
        }
      })
      this.priceSumary.price = price;
      this.priceSumary.discount = price/10;
      this.priceSumary.tax = price/10;
      this.priceSumary.delivery =100;
      this.priceSumary.total = price + (price/10) + 100 -(price/10);
    })
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }
}
