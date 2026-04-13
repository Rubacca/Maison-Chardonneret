

## Plan: Boekingspagina design matchen met Commandeurshuisje referentie

### Analyse van de referentie (commandeurshuisje.nl/reserveren/...)

Uit de screenshots blijkt dat de Commandeurshuisje-pagina deze structuur heeft:

```text
+--------------------------------------------------+
| [hamburger]    Commandeurshuisje     NL/DE  BOEK  |  <- minimale header
+--------------------------------------------------+
|                                                    |
|              R E S E R V E R E N                   |  <- kleine uppercase tagline
|           Boek uw verblijf                         |  <- grote serif titel
|  Kies uw gewenste periode en rond uw boeking...    |  <- subtiel subtekst
|                                                    |
+--------------------------------------------------+
|                                                    |
|  [Recranet widget - volledige breedte]             |
|  Details | Voorzieningen | Beschikbaarheid | ...   |
|  [foto grid]                                       |
|  [kalenders + booking sidebar rechts]              |
|                                                    |
+--------------------------------------------------+
| Online reserveringssysteem: Recranet               |
+--------------------------------------------------+
|                   FOOTER                           |
+--------------------------------------------------+
```

### Verschilpunten met huidige pagina

1. **Fallback-sectie en help-tekst** staan prominent zichtbaar, zelfs als de widget geladen is -- dit maakt de pagina rommelig
2. **Hero subtitle** is te specifiek ("Maison Chardonneret Elegant . Orchimont, Ardennen") vs referentie die een call-to-action gebruikt ("Kies uw gewenste periode en rond uw boeking direct af")
3. **Meta description** vermeldt nog "10 personen" -- moet "4 personen" zijn
4. **Widget container** heeft mogelijk padding/margin die de layout beperkt
5. **Geen border-bottom** onder de hero in referentie -- het vloeit clean over naar de widget

### Wijzigingen in `public/boeken/index.html`

**1. Meta description updaten**
- Van "10 personen" naar "4 personen"

**2. Hero subtekst aanpassen**
- NL: "Kies uw gewenste periode en rond uw boeking direct af."
- FR: "Choisissez votre période et finalisez votre réservation."
- Dit matcht de referentie-stijl (call-to-action i.p.v. locatie-info)

**3. Hero border-bottom verwijderen**
- `border-bottom: 1px solid rgba(0,0,0,0.05)` weghalen voor cleaner overgang

**4. Fallback-sectie verbeteren**
- Standaard `display: none` maken en alleen tonen als widget na 15s niet geladen is
- Hierdoor geen visuele rommel als widget wel laadt

**5. Help-tekst verwijderen of minimaliseren**
- De "Vragen over uw reservering?" tekst verwijderen -- de referentie toont dit niet

**6. Widget section styling**
- Geen extra padding rond de widget-container
- Widget krijgt `max-width: 1200px; margin: 0 auto` voor consistente centering

**7. Footer description updaten**
- "voor het hele gezin" -> "voor 4 personen" (consistent met rest van site)

### Samenvatting

| Onderdeel | Actie |
|-----------|-------|
| Meta description | "10 personen" -> "4 personen" |
| Hero subtitle | Locatie-info -> call-to-action tekst |
| Hero border | Verwijderen |
| Fallback sectie | Standaard verborgen, alleen na timeout tonen |
| Help tekst | Verwijderen |
| Widget container | Clean centering, geen extra padding |
| Footer | Tekst aanpassen naar 4 personen |
| Translations object | NL + FR updaten |

Eén bestand: `public/boeken/index.html`

