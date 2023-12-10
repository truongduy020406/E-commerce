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
  quantity:number=1;
  constructor(private product:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId')

    productId && this.product.getproductId(productId).subscribe((result)=>{
      console.log(result)
      this.productData = result
    })
  }
  handleQuantity(val:string){
      if(this.productQuantity<20 && val ==='plus'){
        this.productQuantity +=1;
      }else if(this.productQuantity>1 && val ==='min'){
        this.productQuantity -=1;
      }
  }
}
