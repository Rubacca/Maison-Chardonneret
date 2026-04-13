

## Plan: Intro-sectie aanpassen naar correcte woninggegevens

### Wijzigingen

**1. Component: `src/components/sections/IntroSection.tsx`**

Statistieken aanpassen:
- **4** Gasten (+2 op aanvraag)
- **2** Slaapkamers (+1 tussenkamer)
- **1** Badkamer + 1 extra toilet

Fallback-beschrijving:
- NL: "Ontdek onze charmante gîte voor 4 personen, ingericht in stijlvolle brocante sfeer in het pittoreske Orchimont. Met een optionele slaapbank in de tussenkamer is er ruimte voor maximaal 6 gasten — in overleg."
- FR: "Découvrez notre charmant gîte pour 4 personnes, aménagé dans un style brocante élégant à Orchimont. Un canapé-lit dans la chambre intermédiaire permet d'accueillir jusqu'à 6 personnes — sur demande."

Statistieken layout wordt 4 kolommen:
| 4 Gasten | 2 Slaapkamers | 1 Badkamer | 1 Extra toilet |
Met subtekst "+2 op aanvraag" onder gasten en "+1 tussenkamer" onder slaapkamers.

**2. Database: `site_content` tabel updaten**

Bestaande intro-rijen bijwerken via insert tool (UPDATE):
- `stat_persons` → "4"
- `stat_persons_label` → NL: "Gasten", FR: "Personnes"  
- `stat_persons_sub` → NL: "+2 op aanvraag", FR: "+2 sur demande" (nieuw)
- `stat_bedrooms` → "2"
- `stat_bedrooms_label` → NL: "Slaapkamers", FR: "Chambres"
- `stat_bedrooms_sub` → NL: "+1 tussenkamer", FR: "+1 chambre intermédiaire" (nieuw)
- `stat_bathrooms` → "1"
- `stat_bathrooms_label` → NL: "Badkamer", FR: "Salle de bain"
- Nieuw: `stat_toilet` → "1", label NL: "Extra toilet", FR: "Toilette supplémentaire"
- `description` → nieuwe NL/FR teksten zoals hierboven

