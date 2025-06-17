import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../core/services/reservation.service';
import { AuthService } from '../../core/services/auth.service';
import { Reservation } from '../../core/models/reservation.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  standalone: false,
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  rezervacije: Reservation[] = [];
  hoveredOcena: { [petId: number]: number } = {};
  ocenaZaRecenziju: { [rezervacijaId: number]: number } = {};

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const email = this.authService.getUser()?.email;
    if (email) {
      this.rezervacije = this.reservationService.getByUser(email)
      .filter(r => r.status === 'preuzeto' && r.ocena === undefined);
    } else {
      this.toastService.error('Korisnik nije ulogovan!');
      this.rezervacije = [];
    }
  }

  sacuvajRecenziju(r: Reservation): void {
    const ocena = this.ocenaZaRecenziju[r.id];
  
    if (!ocena) return;
  
    r.ocena = ocena;
    this.reservationService.update(r);
    this.toastService.success(`Uspešno ste ocenili ${r.pet.naziv} sa ${ocena} 🐾`);

    delete this.ocenaZaRecenziju[r.id];
    this.ngOnInit();
  }  
  
}

