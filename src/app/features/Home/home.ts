import { Component, signal } from '@angular/core';
import { Header } from '../../shared/components/header/header';
// import { Category } from './category/category';
import { Categories } from './Components/categories/categories';
// import { Product } from '../../shared/components/product/product';
import { BestSeller } from './Components/best-seller/best-seller';
import { Footer } from '../../shared/components/footer/footer';
import { Collection } from './Components/collection/collection';
import { Products } from '../shopping/products/products';
import { HeroSection } from './Components/hero-section/hero-section';
import { Commisions } from './Components/commisions/commisions';
import { Search } from './Components/search/search';
import { ProductType } from '../../shared/models/productType';
import { Filter } from '../shopping/filter/filter';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet,BestSeller,Categories,HeroSection,Collection,Commisions],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchTerm: string = '';

}

