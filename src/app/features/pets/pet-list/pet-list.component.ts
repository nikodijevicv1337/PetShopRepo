import { Component, OnInit } from '@angular/core';
import { PetService } from '../../../core/services/pet.service';
import { Pet } from '../../../core/models/pet.model';
import { ReservationService } from '../../../core/services/reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  standalone: false,
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  queryParams: any = {};
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchTerm: string = '';

  selectedVrsta: string = '';
  selectedVelicina: string = '';
  selectedPoreklo: string = '';
  selectedOcena: number = 0;
  maxCena: number = 99999;
  selectedStarost: string = '';

  vrste: string[] = ['Pas', 'Macka', 'Ptica', 'Riba', 'Glodar', 'Egzoticni'];
  velicine: string[] = ['Mala', 'Srednji', 'Veliki'];
  porekla: string[] = ['Beograd', 'Novi Sad', 'Niš', 'Subotica', 'Zrenjanin', 'Kragujevac', 'Pančevo', 'Senta', 'Bor', 'Ostalo'];

  constructor(
              private petService: PetService, 
              private reservationService: ReservationService,
              private route: ActivatedRoute
            ) {}

            ngOnInit(): void {
              this.route.queryParams.subscribe(params => {
              this.extractFiltersFromParams(params);
              this.applyFilter();
            });

              this.petService.getAll().subscribe(data => {
                this.pets = data.map(p => ({
                  ...p,
                  ocena: this.reservationService.getAverageRating(p.id),
                  brojOcena: this.reservationService.getRatingCount(p.id)
                }));
                this.applyFilter();
              });
            }

  extractFiltersFromParams(params: any): void {
    this.searchTerm = params['searchTerm'] || '';
    this.selectedVrsta = this.capitalize(params['selectedVrsta']) || '';
    this.selectedVelicina = this.capitalize(params['selectedVelicina']) || '';
    this.selectedPoreklo = this.capitalize(params['selectedPoreklo']) || '';

    const ocena = parseFloat(params['selectedOcena']);
    this.selectedOcena = !isNaN(ocena) ? ocena : 0;

    const cena = parseInt(params['maxCena']);
    this.maxCena = !isNaN(cena) ? cena : 99999;

    this.selectedStarost = params['selectedStarost'] || '';
  }

  applyFilter(): void {
  this.filteredPets = this.pets.filter(pet => {
    const matchesNaziv = !this.searchTerm || pet.naziv.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesVrsta = !this.selectedVrsta || pet.vrsta.toLowerCase() === this.selectedVrsta.toLowerCase();
    const matchesVelicina = !this.selectedVelicina || pet.velicina.toLowerCase() === this.selectedVelicina.toLowerCase();
    const matchesPoreklo = !this.selectedPoreklo || pet.poreklo.toLowerCase() === this.selectedPoreklo.toLowerCase();
    const matchesCena = pet.cena <= this.maxCena;
    const matchesOcena = pet.ocena >= this.selectedOcena;
    const matchesStarost = !this.selectedStarost || (
      this.selectedStarost === 'mlad' && pet.starost <= 1 ||
      this.selectedStarost === 'odrastao' && pet.starost > 1 && pet.starost <= 4 ||
      this.selectedStarost === 'stariji' && pet.starost > 4
    );

    return matchesNaziv && matchesVrsta && matchesVelicina && matchesPoreklo &&
           matchesCena && matchesOcena && matchesStarost;
  });

  console.log('✅ Rezultat filtriranja:', this.filteredPets);
}

  capitalize(value: string): string {
  return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
}
  
}


