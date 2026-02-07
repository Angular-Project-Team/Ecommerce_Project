import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Collection } from '../Home/Components/collection/collection';
import { Footer } from '../../shared/components/footer/footer';
import { Products } from './products/products';
import { Search } from '../Home/Components/search/search';
import { Filter } from './filter/filter';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping',
  imports: [Header,Collection,Footer,Products,Search,Filter,FormsModule],
  templateUrl: './shopping.html',
  styleUrl: './shopping.css',
})
export class Shopping {
searchTerm: string = '';
}
