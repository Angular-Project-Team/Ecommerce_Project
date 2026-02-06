import { Component, signal } from '@angular/core';
import { UserProfile } from './features/user-profile/user-profile';

@Component({
  selector: 'app-root',
  imports: [UserProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}