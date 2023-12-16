import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity:number=1;
  removeCart = false;
  cartData: product | undefined ;
  constructor(private product:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let productId= this.route.snapshot.paramMap.get('productId');
    productId && this.product.getproductId(productId).subscribe((result)=>{
      this.productData = result

      let cartData =localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId === item.id.toString())
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCart(userId);
        this.product.cartData.subscribe((result)=>{
          let items =  result.filter((item:product)=> productId?.toString() === item.productId?.toString())
          if(items.length){
            this.cartData = items[0];
            this.removeCart=true
          }
        })
      }
      
    })

   
  }
  handleQuantity(val:string){
      if(this.productQuantity<20 && val ==='plus'){
        this.productQuantity +=1;
      }else if(this.productQuantity>1 && val ==='min'){
        this.productQuantity -=1;
      }
  }
  //add to cart
  AddtoCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart = true
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let CartData:cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete CartData.id;
        this.product.addtoCart(CartData).subscribe((data)=>{
          if(data){
            this.product.getCart(userId); 
            this.removeCart = true
          }
        })
      }
      
    }
  }
  //remove cart
  RemoveCart(productId:number){
    if(!localStorage.getItem('user')){    
      this.product.removeItemFromCart(productId)
      
    }else{
      let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
     this.cartData && this.product.removeCart(this.cartData.id)
     .subscribe((result)=>{
        if(result){
          this.product.getCart(userId)
        }
     })
    }
    this.removeCart = false
  }
}
