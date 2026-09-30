# Versioni

- **v1,00** – Prima versione: database locale, 5 ruoli, allenamenti/presenze, statistiche, calendario, anagrafica, utenti, backup.
- **v1,01** – Icone nella cartella principale; versione nella barra del titolo; pulsante Impostazioni (nome e logo società, importazione anagrafica da Excel/CSV).
- **v1,02** – Banner di avviso nuova versione (mostra versione in uso e nuova) con pulsanti "Aggiorna ora" e "Più tardi"; aggiunto `version.json`.
- **v1,03** – Ordine schede: Anagrafica, Allenamenti, Calendario, Statistiche, Utenti, Backup, Ripristino. Anagrafica: aggiunti ruolo, cellulare atleta, cellulare mamma, cellulare papà (anche nell'import da Excel/CSV).
- **v1,04** – Nuova grafica: sfondo bianco e blu al posto del verde (giallo invariato), icone blu.
- **v1,05** – Versione online con Firebase: dati condivisi tra tutti i dispositivi, login vero con ruoli applicati dalle regole del database. Import automatico dei dati della versione locale. Backup/Ripristino compatibili con la versione locale.
- **v1,06** – Sfondo azzurro chiaro con riquadri bianchi; schermata di Benvenuto dopo il login con logo della società; su PC bande laterali (a sinistra logo società, a destra Union Brescia con "Società Affiliata"); icona dell'app = logo su sfondo bianco.
- **v1,07** – "Revoca" elimina profilo e nome utente: il nome può essere riutilizzato per un altro utente. Nuove regole (sezione `usernames`). Nomi utente: lettere, numeri, - e _.
- **v1,08** – Auguri di compleanno: all'ingresso in app compare foto, nome e cognome degli atleti che compiono gli anni quel giorno, visibile a tutti gli utenti di tutte le squadre. Nuova sezione `birthdays` nelle regole.
- **v1,09** – Creazione utente: il messaggio di errore indica il passaggio che ha fallito (lettura nome utente / creazione account / salvataggio profilo) e cosa controllare.
- **v1,10** – Calendario partite: tipo (Campionato, Coppa Brescia, Amichevole), orario e luogo; l'Admin può modificarli dopo l'inserimento. Direttore: calendario mensile stile Google, con filtro categoria; toccando un giorno compaiono tutte le partite di quella data con orari e dettagli.
- **v1,11** – Admin: modifica delle partite già inserite (data, ora, avversario, casa/trasferta, categoria, tipo, luogo, risultato). Admin: elenco utenti con password visibile (tasto Mostra) e "Nuova password". Nuova sezione `credentials` nelle regole.
- **v1,12** – Allenamenti: presenze bloccate con pulsanti Modifica presenze / Salva / Annulla. Admin: inserimento di più giorni e più categorie in un solo colpo. Nuovi ruoli Presidente, Direttore Generale e Direttore Sportivo (stessi permessi del Direttore).
