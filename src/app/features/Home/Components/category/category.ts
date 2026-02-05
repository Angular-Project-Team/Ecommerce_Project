import { Component, Input } from '@angular/core';
import { CategoryType } from '../../../shopping/models/catType';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  @Input() mycategory:CategoryType= {} as CategoryType;

}
