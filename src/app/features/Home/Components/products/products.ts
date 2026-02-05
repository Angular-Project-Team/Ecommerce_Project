import { Component, signal } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { ProductType } from '../../../../shared/models/productType';
import { Product } from '../../../../shared/components/product/product';

@Component({
  selector: 'app-products',
  imports: [Product],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
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
