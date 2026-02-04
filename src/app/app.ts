import { Component, signal } from '@angular/core';

import { HeroSection } from './features/components/hero-section/hero-section';
import { Header } from './shared/components/header/header';
import { Home } from './features/components/home/home';
import { Products } from './features/components/products/products';


@Component({
  selector: 'app-root',
  imports: [Products,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
