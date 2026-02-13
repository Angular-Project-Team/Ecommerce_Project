import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { RouterEvent, RouterLink, RouterLinkActive,  } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
