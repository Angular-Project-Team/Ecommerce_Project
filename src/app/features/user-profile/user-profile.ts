import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RouterOutlet, Router} from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { User } from '../../core/models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [FontAwesomeModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class UserProfile implements OnInit {
  faPenToSquare = faPenToSquare;

  userService:UserService = inject(UserService);
  router:Router = inject(Router);
  id:number = 1;
  user = signal<User | null>(null);

  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe({
      next: (user) => {
        this.user.set(user as User);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  get currentRoute() {
    return this.router.url;
  }
}
