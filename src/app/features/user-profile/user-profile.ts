import { AuthService } from './../../auth/services/authService';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RouterOutlet, Router } from '@angular/router';
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

  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  private readonly authService = inject(AuthService);

  token = localStorage.getItem('userToken');
  userId = this.authService.getUserIdFromToken(this.token!);
  id: number = 1;
  user = signal<User | null>(null);

  logout() {
    localStorage.removeItem('userToken');

    localStorage.clear();

    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe({
      next: (user) => {
        this.user.set(user as User);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });

    const token = localStorage.getItem('userToken');

    if (token) {
      const userId = this.authService.getUserIdFromToken(token);

      if (userId) {
        this.loadUserData(userId);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  loadUserData(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (userData) => {
        this.user.set(userData as User);
        console.log(this.userId);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
  }

  get currentRoute() {
    return this.router.url;
  }
}
