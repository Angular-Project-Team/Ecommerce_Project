import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [FontAwesomeModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class UserProfile {
  faPenToSquare = faPenToSquare;
  constructor(private router: Router, private route: ActivatedRoute) { }

  get currentRoute() {
    return this.router.url;
  }
}
