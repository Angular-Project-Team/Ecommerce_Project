import { Component } from '@angular/core';
import { Product } from "../product/product";
import { ProductType } from '../../models/productType';
import { ProductService } from '../../../features/services/product-service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-related-products',
  imports: [Product],
  templateUrl: './related-products.html',
  styleUrl: './related-products.css',
})
export class RelatedProducts {
    Math = Math;
 constructor(private productServices:ProductService) {}
  products=signal([] as ProductType[])
  ngOnInit(){
    this.productServices.allProducts().subscribe(({
      next:(data)=>{
        this.products.set(data);
      },
      error:(err)=>{console.log(err)}

}))};
}
