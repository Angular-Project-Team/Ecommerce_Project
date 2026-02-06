import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductType } from '../../models/productType';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../features/services/product-service';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
@Input() myproduct:ProductType= {} as ProductType;
@Output() favoriteChange = new EventEmitter<ProductType>();


  constructor(private productService: ProductService) {}

  toggleFavorite() {
    this.myproduct.isFavorite = !this.myproduct.isFavorite;

    // Update backend
    this.productService.updateProduct(this.myproduct.id, this.myproduct).subscribe({
      next: (res) => {
        console.log('Favorite updated on server:', this.myproduct);
      },
      error: (err) => {
        console.error('Error updating favorite:', err);
        // Optionally revert UI if error
        this.myproduct.isFavorite = !this.myproduct.isFavorite;
      },
    });
  }
// toggleFavorite() {
//   this.myproduct.isFavorite = !this.myproduct.isFavorite;
//   this.favoriteChange.emit(this.myproduct);
// }


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

