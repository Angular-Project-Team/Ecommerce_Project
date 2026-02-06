import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {

}
