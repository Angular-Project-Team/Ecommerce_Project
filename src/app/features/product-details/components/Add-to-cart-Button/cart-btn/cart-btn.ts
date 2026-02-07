import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-btn',
  imports: [],
  templateUrl: './cart-btn.html',
  styleUrl: './cart-btn.css',
})
export class CartBtn {
  @Input() productId!: number;
  @Input() selectedColor!: string;
  @Input() quantity!: number;

  @Output() addToCartClicked = new EventEmitter<{productId:number,color:string,quantity:number}>();

  addToCart() {
    if (!this.selectedColor) return; 
    this.addToCartClicked.emit({
      productId: this.productId,
      color: this.selectedColor,
      quantity: this.quantity
    });
    console.log('Add to Cart clicked:', {
      productId: this.productId,
      color: this.selectedColor,
      quantity: this.quantity
    });
  }
}
