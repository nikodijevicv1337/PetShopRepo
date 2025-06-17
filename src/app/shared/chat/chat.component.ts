import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReservationService } from '../../core/services/reservation.service';
import { PetService } from '../../core/services/pet.service';
import { Reservation } from '../../core/models/reservation.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: false,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { text: string, sender: 'user' | 'agent' }[] = [];
  message: string = '';
  showChat: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const key = this.getConvoKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      this.messages = JSON.parse(stored);
    }

  // Prati klikove na "Detalji" linkove
    window.addEventListener('petko-link', (event: any) => {
      const url = event.detail;
      this.router.navigateByUrl(url);
    });
}

  sendMessage() {
    if (!this.message.trim()) return;

    const userMsg = this.message.trim();
    this.messages.push({ text: userMsg, sender: 'user' });
    this.message = '';

    this.http.post<any>('http://localhost:3000/dialogflow', { message: userMsg })
      .subscribe({
        next: (response) => {
          const formatted = this.formatMessage(response.reply);
          this.messages.push({ text: formatted, sender: 'agent' });
          this.saveMessagesToStorage();

          if (response.intent === 'SearchPet' && response.filters) {
            this.petSearchFromAgent(response.filters);
          }

          if (response.intent === 'ReservePet') {
            const nameField = response.parameters?.ime_ljubimca;
            const trazenoIme = nameField?.stringValue?.trim();

            if (!trazenoIme) {
              this.messages.push({
                text: `⚠️ Nisi naveo ime ljubimca za rezervaciju.`,
                sender: 'agent'
              })
              this.saveMessagesToStorage();
              return;
            }

            this.petService.getAll().subscribe(pets => {
              const pet = pets.find(p => p.naziv.toLowerCase() === trazenoIme.toLowerCase());

              if (!pet) {
                this.messages.push({
                  text: `😢 Nema ljubimca sa imenom "${trazenoIme}".`,
                  sender: 'agent'
                })
                this.saveMessagesToStorage();
                return;
              }

              const user = this.authService.getUser();
              if (!user) {
                this.messages.push({
                  text: `🔐 Moraš biti ulogovan da bi rezervisao ljubimca.`,
                  sender: 'agent'
                });
                return;
              }

              const rezervacija: Reservation = {
                id: 0,
                korisnikEmail: user.email,
                pet,
                status: 'u toku',
                datum: new Date().toISOString()
              };

              this.reservationService.add(rezervacija);
              this.router.navigate(['/home']);
            });
          }
        },
        error: (err) => {
          this.messages.push({ text: 'Došlo je do greške pri kontaktiranju agenta.', sender: 'agent' });
          this.saveMessagesToStorage();
          console.error(err);
        }
      });
  }

  petSearchFromAgent(params: any): void {
    const queryParams: any = {};
    const vrstaMap: Record<string, string> = {
      pse: 'Pas', psi: 'Pas', pas: 'Pas',
      macke: 'Macka', mačka: 'Macka', mačke: 'Macka',
      ptice: 'Ptica', ptica: 'Ptica',
      ribe: 'Riba', riba: 'Riba',
      glodari: 'Glodar', glodar: 'Glodar',
      egzoticni: 'Egzoticni'
    };

    if (params?.vrsta) {
      const v = params.vrsta.toLowerCase();
      queryParams.selectedVrsta = vrstaMap[v] || this.capitalize(params.vrsta);
    }

    if (params?.lokacija) queryParams.selectedPoreklo = this.capitalize(params.lokacija);
    if (params?.velicina) queryParams.selectedVelicina = this.capitalize(params.velicina);
    if (params?.starost) queryParams.selectedStarost = params.starost.toString();

    if (params?.cena) {
      const cena = parseInt(params.cena.toString().replace(/[^\d]/g, ''));
      if (!isNaN(cena)) queryParams.maxCena = cena;
    }

    console.log('🛣 Navigacija sa filterima:', queryParams);
    this.router.navigate(['/pets'], { queryParams });
  }

  formatMessage(text: string): string {
  return text.replace(/\n/g, '<br>').replace(/\[Detalji\]\((.*?)\)/g, `<a href="$1" target="_blank">Detalji</a>`);
}


  capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  saveMessagesToStorage(): void {
  const key = this.getConvoKey();
  localStorage.setItem(key, JSON.stringify(this.messages));
}

getConvoKey(): string {
  const user = this.authService.getUser();
  return user ? `petko_convo_${user.email}` : 'petko_convo_guest';
}

}
