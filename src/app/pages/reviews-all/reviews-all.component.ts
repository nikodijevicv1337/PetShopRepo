import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../core/models/reservation.model';
import { ReservationService } from '../../core/services/reservation.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reviews-all',
  templateUrl: './reviews-all.component.html',
  standalone:false,
  styleUrls: ['./reviews-all.component.scss']
})
export class ReviewsAllComponent implements OnInit {
  sveOcene: Reservation[] = [];
  neocenjene: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userEmail = this.authService.getUser()?.email;
    if (userEmail) {
      const sve = this.reservationService.getByUser(userEmail);
      this.sveOcene = sve.filter(r => r.ocena !== undefined);
      this.neocenjene = sve.filter(r => r.status === 'preuzeto' && r.ocena === undefined);
    }
  }

  getPawPercent(ocena: number, index: number): number {
    const full = Math.floor(ocena);
    const decimal = ocena - full;
  
    if (index <= full) return 100;
    if (index === full + 1) return decimal * 100;
    return 0;
  }
   
}
