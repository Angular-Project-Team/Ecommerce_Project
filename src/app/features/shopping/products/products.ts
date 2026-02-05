import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductType } from '../../../shared/models/productType';
import { Product } from '../../../shared/components/product/product';

@Component({
  selector: 'app-products',
  imports: [Product],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnChanges {
  constructor(private productServices: ProductService) {}

  products = signal([] as ProductType[]);
  filteredProducts = signal([] as ProductType[]);

  @Input() recieveCatId: number = 0;
  @Input() selectedMaterial: string = '';
  @Input() selectedPrice: string = '';

  ngOnInit() {
    this.productServices.allProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        // Filter immediately after loading products
        this.filterProducts();
      },
      error: (err) => { console.log(err); }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only filter if products are already loaded
    if (this.products().length > 0) {
      this.filterProducts();
    }
  }

  filterProducts() {
    let result = this.products();

    const catId = Number(this.recieveCatId);

    if (catId !== 0) {
      result = result.filter((prd) => prd.catId === catId);
    }

    if (this.selectedMaterial) {
      result = result.filter((prd) => prd.material === this.selectedMaterial);
    }

    if (this.selectedPrice) {
      if (this.selectedPrice === '0-100')
        result = result.filter((prd) => prd.price >= 0 && prd.price <= 100);
      if (this.selectedPrice === '100-500')
        result = result.filter((prd) => prd.price > 100 && prd.price <= 500);
      if (this.selectedPrice === '500+')
        result = result.filter((prd) => prd.price > 500);
    }

    this.filteredProducts.set(result);
  }
}
