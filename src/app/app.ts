import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeroSection } from './features/components/hero-section/hero-section';
import { Header } from './shared/components/header/header';
import { Home } from './features/components/home/home';
import { Products } from './features/components/products/products';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  imports: [Products,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
