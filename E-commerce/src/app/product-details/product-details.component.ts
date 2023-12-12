import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity:number=1;
  removeCart = false;
  constructor(private product:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let productId= this.route.snapshot.paramMap.get('productId');
    productId && this.product.getproductId(productId).subscribe((result)=>{
      console.log(result)
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
        console.log('loi roi me oi')
      }
      
    }
  }
  //remove cart
  RemoveCart(productId:number){
    this.product.removeItemFromCart(productId)
    this.removeCart = false
  }
}
