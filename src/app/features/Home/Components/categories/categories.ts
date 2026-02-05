import { Component, signal } from '@angular/core';
import { CategoriesService} from '../../../services/categories-service';
import { CategoryType } from '../../../shopping/models/catType';
import { Category } from '../category/category';

@Component({
  selector: 'app-categories',
  imports: [Category],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  constructor(private CategoriesServices:CategoriesService) {}
  categories=signal([] as CategoryType[])
  ngOnInit(){
    this.CategoriesServices.allCategories().subscribe(({
      next:(data)=>{
        this.categories.set(data);
      },
      error:(err)=>{console.log(err)}

}))};

}
