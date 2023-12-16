import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  orderData:order[]|undefined
  constructor(private product : ProductService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    this.product.deleteOrder(orderId!).subscribe((result)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((data)=>{
      this.orderData=data;
    })
  }
}
