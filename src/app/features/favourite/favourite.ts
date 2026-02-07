import { CommonModule } from '@angular/common';
import { Component, computed, signal, OnInit } from '@angular/core';
import { ProductType } from '../../shared/models/productType';
import { ProductService } from '../services/product-service';
import { Product } from '../../shared/components/product/product';

@Component({
  selector: 'app-favourite',
  standalone: true,                 // ✅ REQUIRED
  imports: [CommonModule, Product],
  templateUrl: './favourite.html',
  styleUrls: ['./favourite.css'],   // ✅ plural
})
export class Favourite implements OnInit {

  private products = signal<ProductType[]>([]);
  isLoading = signal(true);          // ✅ now a signal

  favoriteProducts = computed(() =>
    this.products().filter(p => p.isFavorite)
  );

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.isLoading.set(true);

    this.productService.allProducts().subscribe({
      next: products => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: err => {
        console.error('Error loading favorites:', err);
        this.isLoading.set(false);
      }
    });
  }

  onFavoriteChange(product: ProductType) {
    this.products.update(products =>
      product.isFavorite
        ? products
        : products.filter(p => p.id !== product.id)
    );
  }
}
