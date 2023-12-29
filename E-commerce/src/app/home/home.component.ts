import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  popularProduct: undefined | product[];
  trendyProduct: undefined | product[];

  currentSlide = 0; 

  constructor(private productService: ProductService, private carouselConfig: NgbCarouselConfig) {
    carouselConfig.interval = 1000; 
  }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((data) => {
      this.popularProduct = data;
    });
    this.productService.trendyproduct().subscribe((data) => {
      this.trendyProduct = data;
    });
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.popularProduct!.length || 1);
    }, 1000);
  }

  sort(order:string){
    if(order === 'asc'){
      this.trendyProduct?.sort((p1,p2)=>{
        return p1.price > p2.price ? 1 : -1
      })
    }else if(order === 'dsc'){
      this.trendyProduct?.sort((p1,p2)=>{
        return p1.price << p2.price ? -1 : 1
      })
    }
  }
}


