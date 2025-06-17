const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: 'dialogflow-key.json'
});
const projectId = "petko--iebu";

// MOCK podaci
const pets = [
  { id: 1, naziv: 'Bubi', opis: 'Veseo pas, navikao na decu.', vrsta: 'Pas', starost: 2, velicina: 'Srednji', poreklo: 'Novi Sad', cena: 15000, ocena: 4.5 },
  { id: 2, naziv: 'Maza', opis: 'Mazna tigrasta mačka, sterilisana.', vrsta: 'Macka', starost: 3, velicina: 'Mala', poreklo: 'Beograd', cena: 8000, ocena: 4.8 },
  { id: 3, naziv: 'Koko', opis: 'Razgovorljiva papagajka.', vrsta: 'Ptica', starost: 1, velicina: 'Mala', poreklo: 'Zrenjanin', cena: 4000, ocena: 4.2 },
  { id: 4, naziv: 'Zuca', opis: 'Umiljat pas male rase.', vrsta: 'Pas', starost: 4, velicina: 'Mala', poreklo: 'Pančevo', cena: 12000, ocena: 4.6 },
  { id: 5, naziv: 'Luna', opis: 'Siva mačka, mirna i tiha.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Niš', cena: 9000, ocena: 4.9 },
  { id: 6, naziv: 'Roki', opis: 'Labrador, odličan za porodice.', vrsta: 'Pas', starost: 3, velicina: 'Veliki', poreklo: 'Subotica', cena: 18000, ocena: 4.7 },
  { id: 7, naziv: 'Tara', opis: 'Egzotična papagajka, voli muziku.', vrsta: 'Ptica', starost: 1, velicina: 'Mala', poreklo: 'Kragujevac', cena: 7000, ocena: 4.3 },
  { id: 8, naziv: 'Džesi', opis: 'Štene mešanca, veselo i razigrano.', vrsta: 'Pas', starost: 1, velicina: 'Srednji', poreklo: 'Valjevo', cena: 5000, ocena: 4.4 },
  { id: 9, naziv: 'Miki', opis: 'Morsko prase, lako za održavanje.', vrsta: 'Glodar', starost: 1, velicina: 'Mala', poreklo: 'Loznica', cena: 3000, ocena: 4.1 },
  { id: 10, naziv: 'Laki', opis: 'Zlatni retriver, poslušan.', vrsta: 'Pas', starost: 4, velicina: 'Veliki', poreklo: 'Čačak', cena: 20000, ocena: 5.0 },
  { id: 11, naziv: 'Mila', opis: 'Bele boje, razigrana mačka.', vrsta: 'Macka', starost: 1, velicina: 'Mala', poreklo: 'Sombor', cena: 7500, ocena: 4.6 },
  { id: 12, naziv: 'Zizi', opis: 'Vrabac u kavezu, miran.', vrsta: 'Ptica', starost: 2, velicina: 'Mala', poreklo: 'Vranje', cena: 2500, ocena: 3.9 },
  { id: 13, naziv: 'Ben', opis: 'Doberman, energičan i veran.', vrsta: 'Pas', starost: 3, velicina: 'Veliki', poreklo: 'Kruševac', cena: 22000, ocena: 4.7 },
  { id: 14, naziv: 'Nina', opis: 'Sijamska mačka, radoznala.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Požarevac', cena: 10000, ocena: 4.8 },
  { id: 15, naziv: 'Dora', opis: 'Mala činčila, mekana i čista.', vrsta: 'Glodar', starost: 1, velicina: 'Mala', poreklo: 'Kraljevo', cena: 4500, ocena: 4.2 },
  { id: 16, naziv: 'Leo', opis: 'Mlad lav iz zoološkog (samo za prikaz)', vrsta: 'Egzoticni', starost: 1, velicina: 'Veliki', poreklo: 'ZOO Beograd', cena: 50000, ocena: 5.0 },
  { id: 17, naziv: 'Miki', opis: 'Mešanac jazavičara, duguljastog tela.', vrsta: 'Pas', starost: 2, velicina: 'Mala', poreklo: 'Leskovac', cena: 6000, ocena: 4.4 },
  { id: 18, naziv: 'Lora', opis: 'Crna mačka, nezavisna i umiljata.', vrsta: 'Macka', starost: 3, velicina: 'Mala', poreklo: 'Zaječar', cena: 8500, ocena: 4.7 },
  { id: 19, naziv: 'Tito', opis: 'Zelena papagajka, zna reći 5 reči.', vrsta: 'Ptica', starost: 2, velicina: 'Mala', poreklo: 'Senta', cena: 7500, ocena: 4.6 },
  { id: 20, naziv: 'Kiki', opis: 'Mini šnaucer, uredan i veseo.', vrsta: 'Pas', starost: 1, velicina: 'Mala', poreklo: 'Pirot', cena: 13000, ocena: 4.5 },
  { id: 21, naziv: 'Bela', opis: 'Snežno bela mačka sa plavim očima.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Senta', cena: 9500, ocena: 4.9 },
  { id: 22, naziv: 'Đole', opis: 'Papagaj sa šarenim perjem.', vrsta: 'Ptica', starost: 3, velicina: 'Srednja', poreklo: 'Obrenovac', cena: 8000, ocena: 4.2 },
  { id: 23, naziv: 'Žuća', opis: 'Zlatna ribica, idealna za akvarijum.', vrsta: 'Riba', starost: 1, velicina: 'Mala', poreklo: 'Akvashop BG', cena: 1000, ocena: 4.0 },
  { id: 24, naziv: 'Čupko', opis: 'Persijska mačka, mnogo dlake.', vrsta: 'Macka', starost: 4, velicina: 'Velika', poreklo: 'Ruma', cena: 11000, ocena: 4.4 },
  { id: 25, naziv: 'Max', opis: 'Pitbul, dresiran i stabilan.', vrsta: 'Pas', starost: 3, velicina: 'Veliki', poreklo: 'Inđija', cena: 19000, ocena: 4.5 },
  { id: 26, naziv: 'Bubi II', opis: 'Morsko prase, crno-belo.', vrsta: 'Glodar', starost: 1, velicina: 'Mala', poreklo: 'Šabac', cena: 3200, ocena: 4.1 },
  { id: 27, naziv: 'Tina', opis: 'Sijamska maca, jako mazna.', vrsta: 'Macka', starost: 2, velicina: 'Srednja', poreklo: 'Jagodina', cena: 9800, ocena: 4.9 },
  { id: 28, naziv: 'Rile', opis: 'Džek Rasel terijer, brz i pametan.', vrsta: 'Pas', starost: 2, velicina: 'Srednji', poreklo: 'Aranđelovac', cena: 14500, ocena: 4.8 },
  { id: 29, naziv: 'Nemo', opis: 'Narandžasta ribica, jako energična.', vrsta: 'Riba', starost: 1, velicina: 'Mala', poreklo: 'Pet Centar', cena: 1200, ocena: 4.2 },
  { id: 30, naziv: 'Feliks', opis: 'Crno-beli mačak, jako pametan.', vrsta: 'Macka', starost: 3, velicina: 'Srednja', poreklo: 'Bor', cena: 8700, ocena: 4.5 }
];

app.post('/dialogflow', async (req, res) => {
  try {
    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.message,
          languageCode: 'sr'
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    const intent = result.intent.displayName;
    const raw = result.parameters.fields;

    const vrsta = raw.vrsta?.stringValue?.toLowerCase() || null;
    const lokacija = raw.lokacija?.stringValue?.toLowerCase() || null;
    const velicina = raw.velicina?.stringValue?.toLowerCase() || null;
    const starost = raw.starost?.stringValue || null;
    const cena = parseInt(raw.cena?.stringValue?.replace(/\D/g, '') || '') || 999999;

    console.log('🎯 Parsirani parametri:', { vrsta, lokacija, velicina, starost, cena });
    console.log('✅ Detected intent:', intent);

    if (intent === 'SearchPet') {
      const matches = pets.filter(p => {
        const matchVrsta = !vrsta || p.vrsta.toLowerCase() === vrsta;
        const matchLokacija = !lokacija || p.poreklo.toLowerCase().includes(lokacija);
        const matchVelicina = !velicina || p.velicina.toLowerCase() === velicina;
        const matchStarost = !starost || (
          (starost === 'mlad' && p.starost <= 1) ||
          (starost === 'odrastao' && p.starost > 1 && p.starost <= 4) ||
          (starost === 'stariji' && p.starost > 4)
        );
        const matchCena = p.cena <= cena;
        return matchVrsta && matchLokacija && matchVelicina && matchStarost && matchCena;
      });

      const reply = matches.length === 0
        ? 'Nažalost, nema ljubimaca koji odgovaraju tvojoj pretrazi.'
        : `Našao sam ${matches.length} ljubimaca koji odgovaraju tvojoj pretrazi:\n\n` + matches.map(pet =>
            `📛 Ime: ${pet.naziv}\n` +
            `📝 Opis: ${pet.opis}\n` +
            `🐾 Vrsta: ${pet.vrsta}\n` +
            `🎂 Starost: ${pet.starost} god.\n` +
            `📍 Poreklo: ${pet.poreklo}\n` +
            `📏 Veličina: ${pet.velicina}\n` +
            `💰 Cena: ${pet.cena} RSD\n` +
            `⭐ Ocena: ${pet.ocena}/5\n` +
            `🔗 [Detalji](http://localhost:4200/pets/${pet.id})`
        ).join('\n\n');

      return res.json({
        reply,
        intent,
        filters: { vrsta, lokacija, velicina, starost, cena }
      });
    }

    if (intent === 'ReservePet') {
      const ime = raw.ime_ljubimca?.stringValue?.toLowerCase();
      if (!ime) return res.json({ reply: 'Nisam razumeo ime ljubimca kojeg želiš da rezervišeš.' });

      const pet = pets.find(p => p.naziv.toLowerCase() === ime);
      if (!pet) return res.json({ reply: `Nisam pronašao ljubimca po imenu ${ime}.` });

      const reply = `✅ Ljubimac *${pet.naziv}* je uspešno rezervisan!\n\n🔗<a href="/moje-rezervacije">[Klikni ovde za detalje]</a>`;

      return res.json({
        reply,
        intent,
        parameters: result.parameters.fields,
        rezervisanLjubimac: { id: pet.id, naziv: pet.naziv, cena: pet.cena }
      });
    }

    // fallback
    res.json({ reply: result.fulfillmentText, intent });
  } catch (err) {
    console.error('❌ Dialogflow ERROR:', err);
    res.status(500).json({ reply: 'Greška pri kontaktiranju Dialogflow agenta.' });
  }
});

app.listen(3000, () => console.log('✅ Petko server aktivan na http://localhost:3000'));
