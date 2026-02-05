import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Search } from '../components/search/search';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import database from '../../../../database.json';
import { CommonModule } from '@angular/common';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-product-details',
  imports: [Header, Search, RouterLink, RouterLinkActive, CommonModule, Footer],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productName: string = '';
  categoryName: string = '';

  constructor(private route: ActivatedRoute) {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    const product = database.products.find((p: any) => p.id === productId);

    if (product) {
      this.productName = product.name;
      const category = database.categories.find((c: any) => c.catId === product.catId);
      this.categoryName = category ? category.name : 'Category';
    }
  }
}
