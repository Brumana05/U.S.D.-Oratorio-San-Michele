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
5. **Impostazioni progetto (ingranaggio) → Le tue app → Web (`</>`)**: registra l'app, copia l'oggetto `firebaseConfig` e incollalo in `firebase-config.js` al posto di `INCOLLA_QUI`.

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
- Nome utente → internamente `nome@oratorio-sanmichele.app` (non è un'email reale), quindi non esiste "password dimenticata": l'Admin revoca l'utente e ne crea uno nuovo con un altro nome.
- "Revoca" toglie l'accesso ma il nome utente non è riutilizzabile; per cancellarlo del tutto: Firebase → Authentication → Users.
- Backup/Ripristino: il backup contiene giocatori, allenamenti, partite e impostazioni. Il ripristino aggiunge/sovrascrive senza cancellare altro.
- Le foto sono ridimensionate (200 px) e salvate dentro Firestore: non serve Firebase Storage.
- I dati richiedono connessione internet.
- Aggiornamenti: cambia `VER` in `index.html`, `version.json` e il nome della cache in `sw.js`, poi ricarica i file su GitHub. Gli utenti vedranno il banner "Nuova versione disponibile".
