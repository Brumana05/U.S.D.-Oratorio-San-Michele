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
