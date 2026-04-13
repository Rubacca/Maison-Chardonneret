

## Plan: Verbeter design IntroSection

### Problemen in huidige layout (zie screenshot)

1. **Statistieken staan los en ongestructureerd** -- de 4 stats (Gasten, Slaapkamers, Badkamer, Toiletten) staan in een platte `flex-wrap` zonder visuele groepering, waardoor ze er rommelig uitzien
2. **Subtekst bij Slaapkamers is te lang** voor de beschikbare ruimte, waardoor het visueel uit balans raakt met de andere kolommen
3. **Geen visuele scheiding** tussen de tekst-content en de stats -- alles vloeit samen
4. **Stats hebben geen achtergrond** -- ze zweven los op de pagina

### Wijzigingen in `src/components/sections/IntroSection.tsx`

**1. Stats in een grid met achtergrond**
Vervang de `flex-wrap` door een `grid grid-cols-2 sm:grid-cols-4` layout met een subtiele achtergrondkleur (`bg-brand-cream/50`) en padding, zodat de statistieken als een visueel blok gepresenteerd worden.

**2. Elke stat als een card-achtig element**
Elke statistiek krijgt een consistente hoogte met de waarde groot bovenaan, label eronder, en optionele subtekst. Verticale dividers worden vervangen door een grid-gap.

**3. Meer whitespace tussen beschrijving en stats**
Vergroot de `pt-4` naar `pt-8` voor betere visuele scheiding.

**4. Verfijnde typografie voor stats**
- Waarden: `text-3xl md:text-4xl font-serif` (groter, meer impact)
- Labels: `text-sm font-medium` (iets zwaarder voor leesbaarheid)
- Subtekst: `text-xs text-brand-sage italic` (eleganter)

**5. Subtiele border-left accent op elke stat**
Voeg een `border-l-2 border-brand-sage/30 pl-4` toe aan elke stat-cel (behalve de eerste in elke rij) voor visuele structuur zonder zware dividers.

### Resultaat

De stats worden gepresenteerd als een gestructureerd, visueel aantrekkelijk blok dat duidelijk gescheiden is van de beschrijvingstekst, met betere hiërarchie en leesbaarheid.

