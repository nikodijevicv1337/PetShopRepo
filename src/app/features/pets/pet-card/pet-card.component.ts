import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../../../core/models/pet.model';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  standalone: false,
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent {
  @Input() pet!: Pet;

  constructor(private router: Router) {}

  openDetails() {
    this.router.navigate(['/pets', this.pet.id]);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/paw-placeholder.png';
  }  

  getPawPercent(ocena: number, index: number): number {
    if (!ocena) return 0;
    const full = Math.floor(ocena);
    const decimal = ocena - full;
  
    if (index <= full) return 100;
    if (index === full + 1) return decimal * 100;
    return 0;
  }
  
}

