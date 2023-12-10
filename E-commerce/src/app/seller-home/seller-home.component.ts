import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productMessage:undefined| string;
  icon = faTrash;
  iconEdit=faEdit;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProDuct()
  }
  deleteProduct(index:number){
      this.productService.deleteProduct(index).subscribe((result)=>{
        if(result){
          this.productMessage= "delete product success"
          this.listProDuct()
        }
      })

      setTimeout(()=>{
        this.productMessage=undefined
      },3000)
  }
  listProDuct(){
    this.productService.getProduct().subscribe((result)=>{
      this.productList = result
    })
  }
}
