import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string|undefined = "";
  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
  }
  addProduct(data:product){
    this.productService.addproduct(data).subscribe((result)=>{
        if(result){
          this.addProductMessage="product is successfully added"
          this.router.navigate(['/seller-home'])
        }
        setTimeout(()=>(this.addProductMessage = undefined),3000)
    })
  }
}
