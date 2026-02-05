import { Component, Output, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryType } from '../models/catType';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories-service';
import { Product } from '../../../shared/components/product/product';
import { Products } from '../products/products';

@Component({
  selector: 'app-filter',
  imports: [FormsModule,CommonModule,Products],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  constructor(private productServices:CategoriesService) {}
  // categories=signal([] as CategoryType[])
  categories = signal<CategoryType[]>([]);
  selectedCatId:number=0
  selectedMaterial: string = '';
  selectedPrice: string = '';

  ngOnInit(){
    this.productServices.allCategories().subscribe(({
      next:(data)=>{
        this.categories.set(data);
      },
      error:(err)=>{console.log(err)}

}))};

}
