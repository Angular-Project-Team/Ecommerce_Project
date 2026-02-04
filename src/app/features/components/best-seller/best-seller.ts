import { Component, Input, signal } from '@angular/core';
import { ProductType } from '../../../shared/models/productType';
import { Product } from '../../../shared/components/product/product';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-best-seller',
  imports: [Product],
  templateUrl: './best-seller.html',
  styleUrl: './best-seller.css',
})
export class BestSeller {
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
