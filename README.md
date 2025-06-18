# 🐾 PetShop

**PetShop** je moderna Angular aplikacija za pregled, filtraciju i rezervaciju kućnih ljubimaca uz pomoć inteligentnog asistenta Petka. Korisnicima pruža mogućnost registracije, naručivanja, ocenjivanja i pretrage ljubimaca po više kriterijuma.

---

## 🔧 Tehnologije

- **Angular 17** – frontend framework
- **LocalStorage** – za simulaciju backend funkcionalnosti
- **Dialogflow** – za komunikaciju sa agentom (Petko)
- **SCSS** – za stilizaciju i responzivni dizajn

---

## 🔧 Pokretanje projekta lokalno

npm install \n
node server.js \n
ng serve \n

---

## Korisnički tok

Poseta sajtu: Korisnik može pregledati ljubimce i koristiti filtere i agenta i kao gost. \n
Registracija / Logovanje: Potrebno za rezervaciju, profil i ocenjivanje. \n
Pretraga ljubimaca: Filteri i agent omogućavaju filtraciju po vrsti, veličini, ceni, lokaciji i oceni. \n
Detalji ljubimca: Klik na karticu otvara stranicu sa opisom, slikom, ocenom i dugmetom za rezervaciju. \n
Rezervacija ljubimca: Čuvanje rezervacije lokalno uz toast poruku o uspehu. \n
Ocenjivanje: Nakon što je ljubimac preuzet, korisnik može dati ocenu i recenziju. \n
Pristup recenzijama: Pogledaj sve prethodne recenzije na posebnoj stranici. \n
 
---

## Petko – virtuelni agent

Aplikacija koristi Dialogflow agenta povezanog preko Express servera (port 3000). Petko omogućava: \n
Pretragu ljubimaca (SearchPet intent) \n
Rezervaciju ljubimaca (ReservePet intent) \n
Detekciju entiteta: ime ljubimca, cena, starost, vrsta, lokacija \n
Povezivanje sa stranicom /pets i rezervacijama \n

---

## Implementirane funkcionalnosti
✅ Registracija / Login / Logout \n
✅ Pregled svih ljubimaca \n
✅ Filteri po više kriterijuma \n
✅ Kartice ljubimaca sa detaljima \n
✅ Rezervacije (statusi: "u toku", "preuzeto", "otkazano") \n
✅ Ocenjivanje i recenzije ljubimaca \n
✅ Pregled svih recenzija \n
✅ Petko AI agent \n
✅ Responsivan dizajn \n

---

> Napomena: Aplikacija koristi `dialogflow-key.json` koji sadrži Google Credentials za komunikaciju sa agentom. Ovaj fajl nije verzionisan zbog sigurnosti.