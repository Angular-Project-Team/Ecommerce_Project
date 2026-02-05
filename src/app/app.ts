import { Component, signal } from '@angular/core';
import { Home } from './features/Home/home';
import { Products } from './features/shopping/products/products';
import { Product } from './shared/components/product/product';
import { Shopping } from './features/shopping/shopping';



@Component({
  selector: 'app-root',
  imports: [Home,Products,Shopping],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
