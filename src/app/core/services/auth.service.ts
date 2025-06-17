import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'loggedUser';
  private readonly allUsersKey = 'allUsers';

  login(email: string, lozinka: string): boolean {
    const allUsers: User[] = JSON.parse(localStorage.getItem(this.allUsersKey) || '[]');
    const user = allUsers.find(u => u.email === email && u.lozinka === lozinka);
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(user: User): void {
    const allUsers: User[] = JSON.parse(localStorage.getItem(this.allUsersKey) || '[]');
    allUsers.push(user);
    localStorage.setItem(this.allUsersKey, JSON.stringify(allUsers));
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.userKey);

  const user = this.getUser();
  if (user) {
    localStorage.removeItem(`petko_convo_${user.email}`);
  }
  localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }

  updateUser(updatedUser: User): void {
    const allUsers: User[] = JSON.parse(localStorage.getItem(this.allUsersKey) || '[]');
    const index = allUsers.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
      allUsers[index] = updatedUser;
      localStorage.setItem(this.allUsersKey, JSON.stringify(allUsers));
      localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    }
  }
}
