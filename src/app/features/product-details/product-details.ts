import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import database from '../../../../database.json';
import { CommonModule } from '@angular/common';
import { Footer } from '../../shared/components/footer/footer';
import { Search } from '../Home/Components/search/search';

@Component({
  selector: 'app-product-details',
  imports: [Header, RouterLink, RouterLinkActive, CommonModule, Footer, Search],
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
