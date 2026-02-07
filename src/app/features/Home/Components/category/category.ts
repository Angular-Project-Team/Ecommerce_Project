import { Component, Input } from '@angular/core';
import { CategoryType } from '../../../shopping/models/catType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  @Input() mycategory:CategoryType= {} as CategoryType;
 constructor(private router: Router) {}

  goToCategory() {
    this.router.navigate(['/shopping'] , {
      queryParams: { catId: this.mycategory.catId },
       fragment: 'filter'
    });
  }
}
