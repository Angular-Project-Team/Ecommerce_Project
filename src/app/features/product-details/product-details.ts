import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router } from '@angular/router';
import database from '../../../../database.json';
import { CommonModule } from '@angular/common';
import { Footer } from '../../shared/components/footer/footer';
import { Search } from '../Home/Components/search/search';
import { Product } from "../../shared/components/product/product";
import { ProductType } from '../../shared/models/productType';
import { ProductService } from '../services/product-service';
import { signal } from '@angular/core';
import { Rating } from "./components/Rating/rating";
import { Color } from "./components/Color/color/color";
import { Quantity } from "./components/quantity/quantity";
import { FavButton } from "./components/fav-button/fav-button";
import { CartBtn } from "./components/Add-to-cart-Button/cart-btn/cart-btn";
import { CartService } from '../services/cart-service';
import { Details } from './components/Details/details';
import { ReviewCard } from "./components/review-card/review-card";
import { Favourite } from "../favourite/favourite";
import { RelatedProducts } from "../../shared/components/related-products/related-products";
import { ReviewForm } from "./components/review-form/review-form";

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, RouterLinkActive, CommonModule, Search,
    Rating, Color, Quantity, FavButton, CartBtn, Details, ReviewCard, Favourite, RelatedProducts, ReviewForm],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productName: string = '';
  categoryName: string = '';
  categoryId: number = 0;
  productId = 0;
  product = signal({} as ProductType);

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router,private cartService: CartService) {
    this.productId = route.snapshot.params["id"];
    console.log(this.productId);
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    const product = database.products.find((p: any) => p.id === productId);

    if (product) {
      this.productName = product.name;
      this.categoryId = product.catId;
      const category = database.categories.find((c: any) => c.catId === product.catId);
      this.categoryName = category ? category.name : 'Category';
    }
  }

  ngOnInit() {
    // this.productID = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.productbyId(this.productId).subscribe({
      next: (data) => {
        this.product.set(data);
        this.productName = data.name;
        this.categoryId = data.catId;
        const category = database.categories.find((c: any) => c.catId === data.catId);
        this.categoryName = category ? category.name : 'Category';
        console.log(this.product());
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  selectedColor!: string;
  quantity: number = 1;

onColorSelected(color: string) {
  this.selectedColor = color;
}

onQuantityChanged(qty: number) {
  this.quantity = qty;
}

handleAddToCart(event: { productId: number; color: string; quantity: number }) {
  this.cartService.addToCart({
    productId: event.productId,
    color: event.color,
    quantity: event.quantity
  });
console.log(event);
}

onFavoriteChange(updated: ProductType) {
  this.product.set({ ...this.product(), isFavorite: updated.isFavorite });
}

}
