# 🐾 PetShop

**PetShop** je moderna Angular aplikacija za pregled, filtraciju i rezervaciju kućnih ljubimaca uz pomoć inteligentnog asistenta Petka. Korisnicima pruža mogućnost registracije, naručivanja, ocenjivanja i pretrage ljubimaca po više kriterijuma.  

---

## 🔧 Tehnologije

- **Angular 19** – frontend framework  
- **LocalStorage** – za simulaciju backend funkcionalnosti  
- **Dialogflow** – za komunikaciju sa agentom (Petko)  
- **SCSS** – za stilizaciju i responzivni dizajn  

---

## 🔧 Pokretanje projekta lokalno

npm install  
node server.js  
ng serve  

---

## Korisnički tok

Poseta sajtu: Korisnik može pregledati ljubimce i koristiti filtere i agenta i kao gost.  
Registracija / Logovanje: Potrebno za rezervaciju, profil i ocenjivanje.  
Pretraga ljubimaca: Filteri i agent omogućavaju filtraciju po vrsti, veličini, ceni, lokaciji i oceni.  
Detalji ljubimca: Klik na karticu otvara stranicu sa opisom, slikom, ocenom i dugmetom za rezervaciju.  
Rezervacija ljubimca: Čuvanje rezervacije lokalno uz toast poruku o uspehu.  
Ocenjivanje: Nakon što je ljubimac preuzet, korisnik može dati ocenu i recenziju.  
Pristup recenzijama: Pogledaj sve prethodne recenzije na posebnoj stranici.  

---

## Petko – virtuelni agent

Aplikacija koristi Dialogflow agenta povezanog preko Express servera (port 3000). Petko omogućava:  
Pretragu ljubimaca (SearchPet intent)  
Rezervaciju ljubimaca (ReservePet intent)  
Detekciju entiteta: ime ljubimca, cena, starost, vrsta, lokacija  
Povezivanje sa stranicom /pets i rezervacijama  

---

## Implementirane funkcionalnosti
✅ Registracija / Login / Logout  
✅ Pregled svih ljubimaca  
✅ Filteri po više kriterijuma  
✅ Kartice ljubimaca sa detaljima  
✅ Rezervacije (statusi: "u toku", "preuzeto", "otkazano")  
✅ Ocenjivanje i recenzije ljubimaca  
✅ Pregled svih recenzija  
✅ Petko AI agent  
✅ Responsivan dizajn  

---

> Napomena: Aplikacija koristi `dialogflow-key.json` koji sadrži Google Credentials za komunikaciju sa agentom. Ovaj fajl nije verzionisan zbog sigurnosti.