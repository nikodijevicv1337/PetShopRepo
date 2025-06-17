import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    ime: '',
    prezime: '',
    email: '',
    telefon: '',
    adresa: '',
    omiljeneVrste: [],
    lozinka: ''
  };

  sveVrste: string[] = ['Pas', 'Mačka', 'Ptica', 'Riba', 'Glodar'];

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  register(form: any): void {
  if (form.invalid) {
    this.toastService.error('Molimo popunite sva polja ispravno.');
    return;
  }

  this.authService.register(this.user);
  this.toastService.success('Registracija uspešna!');
  this.router.navigate(['/']);
}

  toggleVrsta(vrsta: string): void {
    if (this.user.omiljeneVrste.includes(vrsta)) {
      this.user.omiljeneVrste = this.user.omiljeneVrste.filter(v => v !== vrsta);
    } else {
      this.user.omiljeneVrste.push(vrsta);
    }
  }
}