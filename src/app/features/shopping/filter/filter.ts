import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryType } from '../models/catType';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories-service';
import { Products } from '../products/products';

@Component({
  selector: 'app-filter',
  imports: [FormsModule, CommonModule, Products],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter implements OnChanges {
  constructor(private productServices: CategoriesService) {}

  categories = signal<CategoryType[]>([]);
  selectedCatId: number = 0;
  selectedMaterial: string = '';
  selectedPrice: string = '';
  @Input() searchTerm: string = '';

  // Create signals for all filter values
  searchTermSignal = signal<string>('');
  selectedCatIdSignal = signal<number>(0);
  selectedMaterialSignal = signal<string>('');
  selectedPriceSignal = signal<string>('');

  ngOnInit() {
    this.productServices.allCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => { console.log(err); }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      console.log('Filter received searchTerm:', this.searchTerm);
      this.searchTermSignal.set(this.searchTerm);
    }
  }

  // Update signals when dropdowns change
  onCategoryChange() {
    this.selectedCatIdSignal.set(this.selectedCatId);
  }

  onMaterialChange() {
    this.selectedMaterialSignal.set(this.selectedMaterial);
  }

  onPriceChange() {
    this.selectedPriceSignal.set(this.selectedPrice);
  }
}
