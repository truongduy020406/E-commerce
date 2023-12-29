import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  constructor(private route:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let result = this.route.snapshot.paramMap.get('query')
    result && this.product.searchProduct(result).subscribe((result)=>{
      this.searchResult=result
    })
  }

}
