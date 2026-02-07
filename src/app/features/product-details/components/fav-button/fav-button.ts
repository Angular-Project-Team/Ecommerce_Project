import { Component, signal } from '@angular/core';
import { ProductType } from '../../../../shared/models/productType';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fav-button',
  imports: [CommonModule],
  templateUrl: './fav-button.html',
  styleUrl: './fav-button.css',
})
export class FavButton {

  @Input() myproduct: ProductType = {} as ProductType;
  toggleFavorite() {
    this.myproduct.isFavorite = !this.myproduct.isFavorite;
    console.log('Favorite toggled:', this.myproduct);
  }
}
