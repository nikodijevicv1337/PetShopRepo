import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../core/services/pet.service';
import { Pet } from '../../../core/models/pet.model';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ToastService } from '../../../core/services/toast.service';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  standalone: false,
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent implements OnInit {
  pet?: Pet;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getById(id).subscribe(p => {
      if (p) {
        this.pet = {
          ...p,
          ocena: this.reservationService.getAverageRating(p.id),
          brojOcena: this.reservationService.getRatingCount(p.id)
        };
      } else {
        console.error('Ljubimac nije pronađen.');
      }
    });
  }

  rezervisi(): void {
    const user = this.authService.getUser();
    if (this.pet && user) {
      this.reservationService.add({
        id: 0,
        pet: this.pet,
        status: 'u toku',
        korisnikEmail: user.email,
        datum: new Date().toISOString()
      });
      this.toastService.success(`${this.pet.naziv} je rezervisan!`);
      this.animateCartIcon();
    }
}

animateCartIcon() {
  const icon = document.querySelector('.cart-icon');
  if (icon) {
    icon.classList.add('animate-bounce');
    setTimeout(() => icon.classList.remove('animate-bounce'), 600);
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
