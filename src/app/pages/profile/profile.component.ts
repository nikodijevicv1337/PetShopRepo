import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User;
  sveVrste: string[] = ['Pas', 'Mačka', 'Ptica', 'Riba', 'Glodar'];

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser()!;
  }

  save(): void {
    this.authService.updateUser(this.user);
    alert('Profil sačuvan!');
  }

  toggleVrsta(vrsta: string): void {
    if (this.user.omiljeneVrste.includes(vrsta)) {
      this.user.omiljeneVrste = this.user.omiljeneVrste.filter(v => v !== vrsta);
    } else {
      this.user.omiljeneVrste.push(vrsta);
    }
  }
}

