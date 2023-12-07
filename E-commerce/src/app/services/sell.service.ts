import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignUp } from '../data-type';
@Injectable({
  providedIn: 'root'
})
export class SellService {
  private URL = 'http://localhost:3000/seller';
  constructor( private http:HttpClient  ) { }

  userSignUp(data:SignUp){
    console.warn("service call")
    return this.http.post(this.URL,data)
  }
}
