import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../core/models/reservation.model';
import { ReservationService } from '../../core/services/reservation.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  standalone: false,
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  rezervacije: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.authService.getUser()?.email;
    if (email) {
      this.rezervacije = this.reservationService
        .getByUser(email)
        .sort((a, b) => {
          const dateA = a.datum ? new Date(a.datum).getTime() : 0;
          const dateB = b.datum ? new Date(b.datum).getTime() : 0;
          return dateB - dateA;
      });
    }
  }  

  preuzmi(r: Reservation): void {
    r.status = 'preuzeto';
    this.reservationService.update(r);
    this.toastService.success(`${r.pet.naziv} je preuzet.`);
    this.refresh();
  }

  otkazi(r: Reservation): void {
    r.status = 'otkazano';
    this.reservationService.update(r);
    this.toastService.error(`${r.pet.naziv} je otkazan.`);
    this.refresh();
  }

  vrati(r: Reservation): void {
    r.status = 'u toku';
    this.reservationService.update(r);
    this.toastService.info(`${r.pet.naziv} je vraćen u status "u toku".`);
    this.refresh();
  }

  refresh(): void {
    const email = this.authService.getUser()?.email;
    if (email) {
      this.rezervacije = this.reservationService
        .getByUser(email)
        .sort((a, b) => {
          const dateA = a.datum ? new Date(a.datum).getTime() : 0;
          const dateB = b.datum ? new Date(b.datum).getTime() : 0;
          return dateB - dateA;
        });
    }
  }  

  goToReviews(): void {
    this.router.navigate(['/recenzije']);
  }

  getPawPercent(ocena: number, index: number): number {
    const full = Math.floor(ocena);
    const decimal = ocena - full;
  
    if (index <= full) return 100;
    if (index === full + 1) return decimal * 100;
    return 0;
  }  
  
}

