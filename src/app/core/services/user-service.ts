import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http:HttpClient) {}

  private BASE_URL:string = 'http://localhost:3000/users';

  getUserById(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  getAllUsers() {
    return this.http.get(this.BASE_URL);
  }
  updateUserData(id: number, data: any) {
    return this.http.patch(`${this.BASE_URL}/${id}`, data);
  }
}
