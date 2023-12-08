import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductMessage:string|undefined="";
  productDaTa :product|undefined;
  constructor(private productSevice:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
      let productId = this.route.snapshot.paramMap.get('id');
      console.log(productId)
      productId && this.productSevice.getproductId(productId).subscribe((data)=>{
          console.log(data)
          this.productDaTa= data
      })
  }
  UpdateProduct(data:product){
    if(this.productDaTa){
      data.id= this.productDaTa.id
    }
      this.productSevice.updateProduct(data).subscribe((data)=>{
        if(data){
          this.updateProductMessage= "update product succsess"
        }
      })
      setTimeout(()=>{
        this.updateProductMessage = undefined
      },3000)
  }
}
