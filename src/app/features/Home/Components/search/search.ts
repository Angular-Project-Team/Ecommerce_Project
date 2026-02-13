import { Component, EventEmitter, Output } from '@angular/core';
import { ProductType } from '../../../../shared/models/productType';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
   @Output() searchTermChange = new EventEmitter<string>();

  constructor(private productService: ProductService) {}
 searchTerm: string = '';

onSearchChange() {
    this.searchTermChange.emit(this.searchTerm);
  }

}
