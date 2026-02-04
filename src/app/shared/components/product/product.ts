import { Component, Input } from '@angular/core';
import { ProductType } from '../../models/productType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
@Input() myproduct:ProductType= {} as ProductType;
toggleFavorite() {
    this.myproduct.isFavorite = !this.myproduct.isFavorite;
    console.log('Favorite toggled:', this.myproduct);
    // Add your favorite logic here (e.g., call a service)
  }

  share() {
    console.log('Share:', this.myproduct);

    if (navigator.share) {
      navigator.share({
        title: this.myproduct.name,
        text: `Check out ${this.myproduct.name} for $${this.myproduct.price}`,
        url: window.location.href
      });
    }}
}
