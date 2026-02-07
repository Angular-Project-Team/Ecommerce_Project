import { Component, EventEmitter, signal } from '@angular/core';
import { ProductType } from '../../../../shared/models/productType';
import { Input , Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-fav-button',
  imports: [CommonModule],
  templateUrl: './fav-button.html',
  styleUrl: './fav-button.css',
})
export class FavButton {
@Input() myproduct: ProductType = {} as ProductType;
@Output() favoriteChange = new EventEmitter<ProductType>();


  constructor(private productService: ProductService) {}

  toggleFavorite() {
    this.myproduct.isFavorite = !this.myproduct.isFavorite;
      this.favoriteChange.emit(this.myproduct);
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
}
