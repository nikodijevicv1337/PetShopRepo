import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PetService } from '../../core/services/pet.service';
import { Pet } from '../../core/models/pet.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  popularPets: Pet[] = [];

    constructor(private petService: PetService) {}

    ngOnInit(): void {
      this.petService.getAll().subscribe(pets => {
        this.popularPets = pets
          .sort((a, b) => b.ocena - a.ocena)
          .slice(0, 4);
      });
    }
}
