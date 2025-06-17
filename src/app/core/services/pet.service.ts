import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PetService {
  private pets: Pet[] = [
      { id: 1, naziv: 'Bubi', opis: 'Veseo pas, navikao na decu.', vrsta: 'Pas', starost: 2, velicina: 'Srednji', poreklo: 'Novi Sad', cena: 15000, ocena: 4.5, slikaUrl: 'assets/pet1.jpg' },
      { id: 2, naziv: 'Maza', opis: 'Mazna tigrasta mačka, sterilisana.', vrsta: 'Macka', starost: 3, velicina: 'Mala', poreklo: 'Beograd', cena: 8000, ocena: 4.8, slikaUrl: 'assets/pet2.jpg' },
      { id: 3, naziv: 'Koko', opis: 'Razgovorljiva papagajka.', vrsta: 'Ptica', starost: 1, velicina: 'Mala', poreklo: 'Zrenjanin', cena: 4000, ocena: 4.2, slikaUrl: 'assets/pet3.jpg' },
      { id: 4, naziv: 'Zuca', opis: 'Umiljat pas male rase.', vrsta: 'Pas', starost: 4, velicina: 'Mala', poreklo: 'Pančevo', cena: 12000, ocena: 4.6, slikaUrl: 'assets/pet4.jpg' },
      { id: 5, naziv: 'Luna', opis: 'Siva mačka, mirna i tiha.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Niš', cena: 9000, ocena: 4.9, slikaUrl: 'assets/pet5.jpg' },
      { id: 6, naziv: 'Roki', opis: 'Labrador, odličan za porodice.', vrsta: 'Pas', starost: 3, velicina: 'Veliki', poreklo: 'Subotica', cena: 18000, ocena: 4.7, slikaUrl: 'assets/pet6.jpg' },
      { id: 7, naziv: 'Tara', opis: 'Egzotična papagajka, voli muziku.', vrsta: 'Ptica', starost: 1, velicina: 'Mala', poreklo: 'Kragujevac', cena: 7000, ocena: 4.3, slikaUrl: 'assets/pet7.jpg' },
      { id: 8, naziv: 'Džesi', opis: 'Štene mešanca, veselo i razigrano.', vrsta: 'Pas', starost: 1, velicina: 'Srednji', poreklo: 'Valjevo', cena: 5000, ocena: 4.4, slikaUrl: 'assets/pet8.jpg' },
      { id: 9, naziv: 'Miki', opis: 'Morsko prase, lako za održavanje.', vrsta: 'Glodar', starost: 1, velicina: 'Mala', poreklo: 'Loznica', cena: 3000, ocena: 4.1, slikaUrl: 'assets/pet9.jpg' },
      { id: 10, naziv: 'Laki', opis: 'Zlatni retriver, poslušan.', vrsta: 'Pas', starost: 4, velicina: 'Veliki', poreklo: 'Čačak', cena: 20000, ocena: 5.0, slikaUrl: 'assets/pet10.jpg' },
    
      { id: 11, naziv: 'Mila', opis: 'Bele boje, razigrana mačka.', vrsta: 'Macka', starost: 1, velicina: 'Mala', poreklo: 'Sombor', cena: 7500, ocena: 4.6, slikaUrl: 'assets/pet11.jpg' },
      { id: 12, naziv: 'Zizi', opis: 'Vrabac u kavezu, miran.', vrsta: 'Ptica', starost: 2, velicina: 'Mala', poreklo: 'Vranje', cena: 2500, ocena: 3.9, slikaUrl: 'assets/pet12.jpg' },
      { id: 13, naziv: 'Ben', opis: 'Doberman, energičan i veran.', vrsta: 'Pas', starost: 3, velicina: 'Veliki', poreklo: 'Kruševac', cena: 22000, ocena: 4.7, slikaUrl: 'assets/pet13.jpg' },
      { id: 14, naziv: 'Nina', opis: 'Sijamska mačka, radoznala.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Požarevac', cena: 10000, ocena: 4.8, slikaUrl: 'assets/pet14.jpg' },
      { id: 15, naziv: 'Dora', opis: 'Mala činčila, mekana i čista.', vrsta: 'Glodar', starost: 1, velicina: 'Mala', poreklo: 'Kraljevo', cena: 4500, ocena: 4.2, slikaUrl: 'assets/pet15.jpg' },
      { id: 16, naziv: 'Leo', opis: 'Mlad lav iz zoološkog (samo za prikaz)', vrsta: 'Egzoticni', starost: 1, velicina: 'Veliki', poreklo: 'ZOO Beograd', cena: 50000, ocena: 5.0, slikaUrl: 'assets/pet16.jpg' },
      { id: 17, naziv: 'Miki', opis: 'Mešanac jazavičara, duguljastog tela.', vrsta: 'Pas', starost: 2, velicina: 'Mala', poreklo: 'Leskovac', cena: 6000, ocena: 4.4, slikaUrl: 'assets/pet17.jpg' },
      { id: 18, naziv: 'Lora', opis: 'Crna mačka, nezavisna i umiljata.', vrsta: 'Macka', starost: 3, velicina: 'Mala', poreklo: 'Zaječar', cena: 8500, ocena: 4.7, slikaUrl: 'assets/pet18.jpg' },
      { id: 19, naziv: 'Tito', opis: 'Zelena papagajka, zna reći 5 reči.', vrsta: 'Ptica', starost: 2, velicina: 'Mala', poreklo: 'Senta', cena: 7500, ocena: 4.6, slikaUrl: 'assets/pet19.jpg' },
      { id: 20, naziv: 'Kiki', opis: 'Mini šnaucer, uredan i veseo.', vrsta: 'Pas', starost: 1, velicina: 'Mala', poreklo: 'Pirot', cena: 13000, ocena: 4.5, slikaUrl: 'assets/pet20.jpg' },
    
      { id: 21, naziv: 'Bela', opis: 'Snežno bela mačka sa plavim očima.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Senta', cena: 9500, ocena: 4.9, slikaUrl: 'assets/pet21.jpg' },
      { id: 22, naziv: 'Đole', opis: 'Papagaj sa šarenim perjem.', vrsta: 'Ptica', starost: 3, velicina: 'Srednja', poreklo: 'Obrenovac', cena: 8000, ocena: 4.2, slikaUrl: 'assets/pet22.jpg' },
      { id: 23, naziv: 'Žuća', opis: 'Zlatna ribica, idealna za akvarijum.', vrsta: 'Riba', starost: 1, velicina: 'Mala', poreklo: 'Akvashop BG', cena: 1000, ocena: 4.0, slikaUrl: 'assets/pet23.jpg' },
      { id: 24, naziv: 'Čupko', opis: 'Persijska mačka, mnogo dlake.', vrsta: 'Macka', starost: 4, velicina: 'Velika', poreklo: 'Ruma', cena: 11000, ocena: 4.4, slikaUrl: 'assets/pet24.jpg' },
      { id: 25, naziv: 'Max', opis: 'Pitbul, dresiran i stabilan.', vrsta: 'Pas', starost: 3, velicina: 'Veliki', poreklo: 'Inđija', cena: 19000, ocena: 4.5, slikaUrl: 'assets/pet25.jpg' },
      { id: 26, naziv: 'Bubi II', opis: 'Morsko prase, crno-belo.', vrsta: 'Glodar', starost: 1, velicina: 'Mala', poreklo: 'Šabac', cena: 3200, ocena: 4.1, slikaUrl: 'assets/pet26.jpg' },
      { id: 27, naziv: 'Tina', opis: 'Sijamska maca, jako mazna.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Jagodina', cena: 9800, ocena: 4.9, slikaUrl: 'assets/pet27.jpg' },
      { id: 28, naziv: 'Rile', opis: 'Džek Rasel terijer, brz i pametan.', vrsta: 'Pas', starost: 2, velicina: 'Srednji', poreklo: 'Aranđelovac', cena: 14500, ocena: 4.8, slikaUrl: 'assets/pet28.jpg' },
      { id: 29, naziv: 'Nemo', opis: 'Narandžasta ribica, jako energična.', vrsta: 'Riba', starost: 1, velicina: 'Mala', poreklo: 'Pet Centar', cena: 1200, ocena: 4.2, slikaUrl: 'assets/pet29.jpg' },
      { id: 30, naziv: 'Feliks', opis: 'Crno-beli mačak, jako pametan.', vrsta: 'Macka', starost: 3, velicina: 'Srednja', poreklo: 'Bor', cena: 8700, ocena: 4.5, slikaUrl: 'assets/pet30.jpg' }
  ];

  getAll(): Observable<Pet[]> {
    return of(this.pets);
  }

  getById(id: number): Observable<Pet | undefined> {
    return of(this.pets.find(p => p.id === id));
  }
}
