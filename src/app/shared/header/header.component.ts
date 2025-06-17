import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
    private toastService: ToastService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.toastService.info('Uspešno ste se odjavili.');
  }

}
