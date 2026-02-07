import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity',
  imports: [CommonModule],
  templateUrl: './quantity.html',
  styleUrl: './quantity.css',
})
export class Quantity {
 @Output() quantityChanged = new EventEmitter<number>();
  quantity: number = 1;

  increase() {
    this.quantity++;
     if(this.quantity > 10) {
    this.quantity = 10; 
  }
    this.quantityChanged.emit(this.quantity);
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChanged.emit(this.quantity);
    }
  }

}
