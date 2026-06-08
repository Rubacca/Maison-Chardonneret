## Plan: /boeken/ tonen als directe detailpagina van Maison Chardonneret

### Wat er nu fout gaat

De Recranet widget rendert wel HTML maar zonder zijn eigen styling:
- Filterknoppen, dropdowns en icons verschijnen kaal
- De foto van de accommodatie ontbreekt (lege grijze blok)
- Sorteer- en pagineerknoppen zijn ongestyled

Twee waarschijnlijke oorzaken:
1. **`<base href="/boeken/">` in de `<head>`** breekt de relatieve URL's die de Recranet SDK gebruikt voor zijn CSS, icons en afbeeldingen — alle assets worden onder `/boeken/...` opgevraagd in plaats van de Recranet CDN.
2. We gebruiken `<recranet-accommodations>` (lijstweergave met zoekfilters) terwijl de referentie-site `commandeurshuisje.nl` de **single-accommodation widget** gebruikt, die direct foto's, tabs (Details / Voorzieningen / Beschikbaarheid) en de boekings-sidebar toont — geen zoekformulier nodig want er is maar één woning.

### Wijzigingen in `public/boeken/index.html`

**1. `<base>`-tag verwijderen**
Regel 6 (`<base href="/boeken/" />`) eruit. Alle interne links zijn al absoluut (`/`, `/#huis`, etc.), dus dit heeft geen impact behalve dat de widget weer normaal werkt.

**2. Widget vervangen door single-accommodation element**
```html
<!-- nu -->
<recranet-accommodations></recranet-accommodations>

<!-- wordt -->
<recranet-accommodation accommodation="maison-chardonneret-elegant"></recranet-accommodation>
```
De slug `maison-chardonneret-elegant` halen we uit het bestaande portaal-URL (`maison-chardonneret-elegant.recranet.com`). Als de Recranet SDK een numeriek accommodation-ID verwacht in plaats van een slug, halen we dat ID uit het Recranet beheerpaneel (organisatie 1640) en passen we het attribuut aan.

**3. CSS custom properties uitbreiden**
De selector verbreden zodat zowel de oude als de nieuwe widget de juiste accent-kleur krijgen:
```css
recranet-accommodation,
recranet-accommodations {
  display: block;
  width: 100%;
  min-height: 600px;
  --recranet-primary: #8B9D83;
  --recranet-primary-hover: #7A8C73;
}
```

**4. Fallback-link laten wijzen naar de juiste detail-URL**
```
https://maison-chardonneret-elegant.recranet.com/nl/accommodations/maison-chardonneret-elegant
```
(en `/fr/...` voor de Franse versie) — zodat de noodknop altijd werkt.

**5. Hero, header en footer blijven exact zoals nu** — die zijn al goed.

### Verificatie

Na de wijziging:
- `/boeken/` openen → widget moet foto's, tabs en boekings-sidebar tonen, identiek qua opbouw aan `commandeurshuisje.nl/reserveren/...`
- Check console op 404's voor assets (mag niet meer voorkomen na verwijderen `<base>`)
- Test taalwissel NL ↔ FR via de knoppen rechtsboven

Eén bestand aangepast: `public/boeken/index.html`. Geen backend-wijzigingen.
