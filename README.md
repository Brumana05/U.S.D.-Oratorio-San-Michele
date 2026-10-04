# U.S.D. Oratorio San Michele – App presenze (versione online, Firebase)

I dati sono su Firebase (gratuito per una società di queste dimensioni) e restano aggiornati su tutti i telefoni. I file dell'app stanno su GitHub Pages.

## PRIMA DI AGGIORNARE dalla versione locale
Se stai usando la v1,04 locale con dati inseriti: aprila, entra come Admin e premi **Backup** (scarica un file). Tienilo da parte.
(Il passaggio è comunque recuperabile: la v1,05 rileva i dati rimasti sul dispositivo e propone di importarli.)

## 1. Crea il progetto Firebase
1. https://console.firebase.google.com → **Aggiungi progetto** (Analytics non serve).
2. **Build → Authentication → Inizia → Email/password → Abilita**.
3. **Build → Firestore Database → Crea database** (modalità produzione, regione `eur3` o `europe-west`).
4. Scheda **Regole** di Firestore: incolla tutto `firestore.rules` e premi **Pubblica**. Sono le regole a far rispettare i ruoli: un Allenatore non può leggere né modificare altre squadre, il Direttore non può scrivere.
5. **Impostazioni progetto (ingranaggio) → Le tue app → Web (`</>`)**: registra l'app, scegli **Config**, copia i valori dell'oggetto `firebaseConfig` e incollali in `firebase-config.js`. La prima riga del file deve restare **`export const firebaseConfig = {`** (con `export`).

## 2. Pubblica su GitHub Pages
1. Nel repository carica **tutti** i file di questa cartella, sostituendo quelli vecchi (`version.json` compreso).
2. Se non l'hai già fatto: Settings → Pages → Deploy from a branch → `main` / root.
3. **Firebase → Authentication → Impostazioni → Domini autorizzati**: aggiungi `TUO-UTENTE.github.io`.

## 3. Primo avvio
1. Apri l'app, tocca **"Primo avvio dell'app?"** e crea l'Admin (una volta sola).
2. Se sul dispositivo c'erano i dati della versione locale, in Home compare il riquadro giallo **"Dati della versione precedente trovati"**: premi *Importa nel database online*.
   In alternativa, da **Ripristino** carichi il file di Backup della versione locale.
3. Da **Utenti** ricrea gli altri profili (le password della versione locale non si possono trasferire).

## Note
- Nome utente → internamente un'email fittizia (non reale): non esiste "password dimenticata". L'Admin usa **Revoca** (elimina profilo e nome utente) e ricrea l'utente, anche con lo stesso nome utente.
- Dopo una revoca resta in Firebase → Authentication → Users una voce orfana (solo email fittizia e password cifrata): non dà accesso a nulla e si può cancellare a mano quando vuoi. L'app non può cancellarla da sola senza i servizi a pagamento di Firebase.
- **Compleanni (v1,08):** ripubblica le regole (sezione `birthdays`). Quando l'Admin apre l'app, i compleanni si sincronizzano da soli dall'anagrafica (serve la data di nascita). Ogni utente, di qualsiasi squadra, vede il messaggio di auguri il giorno del compleanno.
- Aggiornando dalla v1,06 ripubblica le **regole** (`firestore.rules`): è stata aggiunta la sezione `usernames`. Gli utenti già esistenti continuano ad accedere normalmente.
- Backup/Ripristino: il backup contiene giocatori, allenamenti, partite e impostazioni. Il ripristino aggiunge/sovrascrive senza cancellare altro.
- Le foto sono ridimensionate (200 px) e salvate dentro Firestore: non serve Firebase Storage.
- I dati richiedono connessione internet.
- Aggiornamenti: cambia `VER` in `index.html`, `version.json` e il nome della cache in `sw.js`, poi ricarica i file su GitHub. Gli utenti vedranno il banner "Nuova versione disponibile".

## Se la creazione di un utente dà "permission-denied"
Quasi sempre le regole di Firestore pubblicate non sono l'ultima versione. In Firebase → Firestore Database → **Regole**: il testo deve contenere le sezioni `match /usernames/{name}` e `match /birthdays/{id}`. Se mancano, cancella tutto, incolla di nuovo `firestore.rules` e premi **Pubblica**. Da v1,09 il messaggio indica anche il passaggio che ha fallito.

## Password degli utenti (v1,11)
Le password degli utenti creati dalla v1,11 in poi sono salvate in chiaro in Firestore, in una sezione (`credentials`) leggibile **solo dall'Admin**, e l'Admin le vede in Utenti (tasto Mostra). Chi ha accesso al progetto Firebase o all'account Admin può leggerle: usate password diverse da quelle usate altrove. Per gli utenti creati prima la password non è recuperabile: usare **Nuova password**. Ripubblica `firestore.rules` (nuova sezione `credentials`).

## Novità v1,12
- **Presenze protette:** in Allenamenti i pulsanti Pres./Ass. sono bloccati finché non premi **Modifica presenze**; le modifiche si confermano con **Salva** (o si scartano con **Annulla**).
- **Più allenamenti insieme (Admin):** si scelgono più giorni sul calendario e più categorie; l'app crea un allenamento per ogni giorno e categoria, saltando quelli già presenti.
- **Nuovi ruoli:** Presidente, Direttore Generale, Direttore Sportivo, con gli stessi permessi del Direttore (sola visualizzazione di tutte le categorie). **Ripubblica `firestore.rules`** (cambiano le regole sui ruoli).

## Novità v1,13
- **Statistiche:** le percentuali usano solo gli allenamenti già svolti (data odierna compresa). Toccando un atleta si apre il suo calendario mensile (settembre–maggio) con presenze (✓ verde), assenze (✗ rosso), non segnato (–) e allenamenti in programma.
- **Allenamenti:** elenco per mese da settembre a maggio, in ordine cronologico; il selettore dei giorni per l'Admin è limitato alla stagione settembre–maggio.
- **Anagrafica:** Allenatore, Collaboratore Tecnico e Dirigente possono aggiungere e modificare i giocatori della propria squadra (non eliminarli).
- **Calendario partite:** Direttore, Presidente, Direttore Generale e Direttore Sportivo hanno il pulsante "Modifica partite": scelgono la categoria e aggiungono/modificano le partite.
- **Richiesta Amichevoli** (Allenatore, Collaboratore, Dirigente): giorno dal–al e fascia oraria. Direzione e Admin le gestiscono da "Richieste amichevoli": *Conferma e inserisci partita* crea la partita (tipo Amichevole) nel calendario della categoria; *Annulla richiesta* la nega, con motivo facoltativo.
- **Notifiche:** badge sui pulsanti, finestra "Notifiche" all'ingresso in app e, se attivate dal pulsante in Home, avvisi del browser mentre l'app è aperta o in background. Non sono notifiche "push" ad app chiusa: richiederebbero Cloud Functions (piano Blaze, a pagamento).
- **Richiesta miglioramenti** (tutti): il testo lo legge solo l'Admin, che vede chi l'ha scritto e risponde; l'utente vede solo le proprie richieste e le risposte.
- **Regole:** ripubblica `firestore.rules` (nuove sezioni `requests` e `feedback`, permessi su `players`, `matches`, `birthdays`).

## Novità v1,14
- **Eliminare giocatori:** anche Allenatore, Collaboratore Tecnico e Dirigente possono eliminare i giocatori della propria squadra.
- **Convocazioni:** si sceglie la partita dal calendario della categoria, si preme **Compila**, si imposta per ogni atleta *Convocato* o *Non convocato* (solo per i Non convocati si può aggiungere *Infortunato* o *Prestito*) e si preme **Salva**. La convocazione resta salvata nell'app (si riapre e si modifica dalla stessa partita) e si scarica come immagine **JPG** con lo stesso layout del foglio Excel. Dove è disponibile compare anche **Condividi** (salvataggio su Foto/WhatsApp da telefono).
- Direttore, Direttore Generale, Direttore Sportivo, Presidente e Segreteria possono solo consultare le convocazioni.
- **Nuovo ruolo Segreteria:** stessi permessi del Direttore (vede tutte le categorie, modifica il calendario partite, gestisce le richieste di amichevoli).
- **Regole:** ripubblica `firestore.rules` (nuova sezione `convocations`, eliminazione giocatori per lo staff, ruolo `segreteria`).

## Novità v1,15 – Valutazioni
- Nuova sezione **Valutazioni** (Allenamento / Partita) con la scala: 4 Insufficiente, 5 Mediocre, 6 Sufficiente, 7 Buono, 8 Ottimo, 9 Eccellente.
- Attiva per ora solo per **Giovanissimi Under 14** (allenamenti e partite) e **Giovanissimi Under 15** (solo partite). Per attivarla su altre categorie bisogna aggiungerle in `RATE` (index.html) e nella funzione `rateOk` di `firestore.rules`.
- Allenamenti: si valutano solo gli atleti segnati *Presenti* e solo allenamenti già svolti (oggi compreso). Partite: solo dopo l'orario di inizio; se esiste la convocazione si valutano i convocati, altrimenti tutti i giocatori.
- Modificano: Allenatore, Collaboratore Tecnico, Dirigente (propria squadra) e Admin; gli altri ruoli consultano soltanto.
- Statistiche: media voto di ogni atleta, voto accanto a ogni allenamento in cui è stato presente, elenco dei voti delle partite.
- Il Backup ora include anche valutazioni e convocazioni.
- **Ripubblica `firestore.rules`** (nuova sezione `ratings`).

## Novità v1,18
- Nelle Valutazioni c'è anche **SV – Senza voto**: l'atleta risulta valutato ma il voto non entra nelle medie (le statistiche indicano quanti SV ci sono).

## Novità v1,19 – Risultati
- Nel **Calendario** di Direttore, Presidente, Direttore Generale, Direttore Sportivo e Segreteria c'è la tabella *Vittorie, pareggi e sconfitte* per ogni categoria (con totale e gol fatti-subiti), filtrabile per categoria e per tipo di partita. Le partite del calendario sono colorate: verde vinta, grigio pareggiata, rosso persa. Nella griglia mensile ogni partita è un pallino dello stesso colore (vuoto = da giocare). Un riepilogo della categoria è visibile anche all'Admin nella modifica partite.
- Contano solo le partite con il risultato inserito.
