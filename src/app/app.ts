import { Component, signal } from '@angular/core';
import { Home } from './features/Home/home';
import { Products } from './features/Home/Components/products/products';
import { Product } from './shared/components/product/product';



@Component({
  selector: 'app-root',
  imports: [Home,Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
