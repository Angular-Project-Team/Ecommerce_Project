import { Component, signal } from '@angular/core';
import { Home } from './features/Home/home';
import { Products } from './features/shopping/products/products';
import { Product } from './shared/components/product/product';
import { Shopping } from './features/shopping/shopping';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Favourite } from './features/favourite/favourite';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
