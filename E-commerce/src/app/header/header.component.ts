import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string   = '';
  userName:string   = '';

  searchResult : undefined | product[];
  cartItem: number = 0;
  constructor(private router:Router ,private product:ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
        }
         else {
          this.menuType = 'default';
        }
      }
    });

    //cart 
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItem= JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((item)=>{
        this.cartItem = item.length;
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([]);
  }
  searchProduct(query:KeyboardEvent){
      if(query){
        const element = query.target as HTMLInputElement;
        this.product.searchProduct(element.value).subscribe((result)=>{
            if(result.length> 5){
              result.length = 5
            }
            this.searchResult = result
        })
      }
  }
  hideSearch(){
    this.searchResult= undefined
  }
  submit(value:string){
    console.log(value)
    this.router.navigate([`search/${value}`])
  }
  redictTodetails(id:number){ 
    this.router.navigate([`details/${id}`])
  }
  
}
