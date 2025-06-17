import { Pet } from './pet.model';

export interface Reservation {
  id: number;
  pet: Pet;
  status: 'u toku' | 'preuzeto' | 'otkazano';
  ocena?: number;
  korisnikEmail: string;
  datum: string;
}
