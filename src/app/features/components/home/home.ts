import { Component } from '@angular/core';
import { Header } from '../../../shared/components/header/header';
import { HeroSection } from '../hero-section/hero-section';
import { Category } from '../category/category';
import { Categories } from '../categories/categories';
import { Product } from '../../../shared/components/product/product';
import { Products } from '../products/products';
import { BestSeller } from '../best-seller/best-seller';
import { Footer } from '../../../shared/components/footer/footer';
import { Search } from '../search/search';
import { Collection } from '../collection/collection';
import { Commisions } from '../commisions/commisions';

@Component({
  selector: 'app-home',
  imports: [Products,BestSeller,Header,Footer,Categories,HeroSection,Search,Collection,Commisions],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
