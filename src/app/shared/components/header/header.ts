import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
// import { RouterEvent, RouterLink, RouterLinkActive,  } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
