import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { emit } from 'process';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }

  addproduct(data:product){
    return this.http.post('http://localhost:3000/Products',data);
  }

  getProduct(){
    return this.http.get<product[]>('http://localhost:3000/Products');
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }
  getproductId(id:string){
    return this.http.get<product>(`http://localhost:3000/Products/${id}`)
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/Products/${product.id}`,product)
  }

  popularProduct(){
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=4');
  }
  trendyproduct(){
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=8');
  }
  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/Products?q=${query}`);
  }

  localAddToCart(data:product){
    let cartData = [];
    let  localCart = localStorage.getItem('localCart');

    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartData.emit([data]);
    }else{
      cartData =JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))

    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items);
    }
    
  }

  addtoCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }

  getCart(userId:number){
   this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,{
      observe:'response'
    }).subscribe((result)=>{
        if(result && result.body){
          this.cartData.emit(result.body)
        }
    })
  }

  removeCart(cartId:number){
    return  this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:"response"}).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
  deleteOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }


}
