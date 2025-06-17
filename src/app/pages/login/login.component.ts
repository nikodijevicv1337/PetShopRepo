import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  lozinka: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  login(form: NgForm): void {
    if (!form.valid) {
    this.toastService.error('Sva polja su obavezna.');
    return;
  }

  const success = this.authService.login(this.email, this.lozinka);
  if (success) {
    this.toastService.success('Uspešno ste se prijavili!');
    this.router.navigate(['/']);
  } else {
    this.toastService.error('Pogrešni kredencijali.');
  }
  }
}