import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CartService } from '../../../features/services/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private readonly cartService = inject(CartService);
  readonly cartCount = this.cartService.cartCount;

  ngOnInit() {
    this.cartService.loadCount();
  }

}
