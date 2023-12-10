import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
}