import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-color',
  imports: [CommonModule],
  templateUrl: './color.html',
  styleUrl: './color.css',
})
export class Color {
 @Output() colorSelected = new EventEmitter<string>();
  colors = ['#D3AF37', '#d1d5db', '#f8b996'];
  selectedColor!: string;

  selectColor(color: string) {
    this.selectedColor = color;
    this.colorSelected.emit(color);
  }

}
