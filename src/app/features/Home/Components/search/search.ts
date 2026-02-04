import { Component, EventEmitter, Output } from '@angular/core';
import { ProductType } from '../../../../shared/models/productType';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
   @Output() resultsChange = new EventEmitter<ProductType[]>();

  constructor(private productService: ProductService) {}

  onSearch(value: string) {
    if (!value.trim()) {
      this.resultsChange.emit([]);
      return;
    }

    this.productService.allProducts().subscribe(products => {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      this.resultsChange.emit(filtered);
    });
  }


}
