import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private key = 'reservations';

  getAll(): Reservation[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getByUser(email: string): Reservation[] {
    return this.getAll().filter(r => r.korisnikEmail === email);
  }

  add(res: Reservation): void {
    const list = this.getAll();
    res.id = Date.now();
    res.datum = new Date().toISOString();
    list.push(res);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  update(res: Reservation): void {
    const list = this.getAll();
    const idx = list.findIndex(r => r.id === res.id);
    if (idx !== -1) {
      list[idx] = res;
      localStorage.setItem(this.key, JSON.stringify(list));
    }
  }

  getAverageRating(petId: number): number {
    const ocene = this.getAll()
      .filter(r => r.pet.id === petId && r.ocena !== undefined)
      .map(r => r.ocena!);
  
    if (ocene.length === 0) return 0;
    return +(ocene.reduce((a, b) => a + b) / ocene.length).toFixed(1);
  }  

  getRatingCount(petId: number): number {
    return this.getAll()
      .filter(r => r.pet.id === petId && r.ocena !== undefined)
      .length;
  }  
  
  
}
