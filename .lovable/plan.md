

## Plan: Supabase CMS voor Content Beheer

### Overzicht

We bouwen een database-backed CMS met Supabase waarmee meerdere mensen de website-content kunnen beheren via een beveiligd admin-paneel. Alle teksten, vertalingen (NL/FR) en afbeeldingen worden vanuit de database geladen in plaats van hardcoded in componenten.

### Database Structuur

**Tabel: `site_content`**
| Kolom | Type | Beschrijving |
|-------|------|-------------|
| id | uuid (PK) | |
| section | text | Bijv. `hero`, `intro`, `usps`, `features`, `location`, `footer` |
| key | text | Bijv. `title`, `subtitle`, `description` |
| value_nl | text | Nederlandse tekst |
| value_fr | text | Franse tekst |
| updated_at | timestamptz | |

Unique constraint op `(section, key)`.

**Tabel: `site_images`**
| Kolom | Type | Beschrijving |
|-------|------|-------------|
| id | uuid (PK) | |
| section | text | Bijv. `hero`, `intro`, `features` |
| key | text | Bijv. `background`, `image_1` |
| url | text | Supabase Storage URL |
| alt_nl | text | Alt-tekst NL |
| alt_fr | text | Alt-tekst FR |
| updated_at | timestamptz | |

**Tabel: `reviews`**
| Kolom | Type | Beschrijving |
|-------|------|-------------|
| id | uuid (PK) | |
| text_nl | text | |
| text_fr | text | |
| author | text | |
| country | text | |
| sort_order | int | |
| visible | boolean | |

**Authenticatie & Rollen:**
- Supabase Auth voor admin login
- `user_roles` tabel met `admin` rol (conform security richtlijnen)
- RLS policies: iedereen kan lezen, alleen admins kunnen schrijven

### Frontend Architectuur

**1. Content Hook: `useContent()`**
- Haalt alle `site_content` en `site_images` op via Supabase client
- Cached met React Query (stale time 5 min)
- Retourneert `getT(section, key)` functie die op basis van `currentLang` de juiste vertaling geeft
- Retourneert `getImage(section, key)` voor afbeeldingen

**2. Refactoring van secties**
Alle hardcoded teksten in `HeroSection`, `IntroSection`, `FeatureCardsSection`, `USPSection`, `LocationSection`, `SocialProofSection`, `Navbar`, `Footer` worden vervangen door `getT()` en `getImage()` calls. Fallback naar huidige hardcoded waarden als database leeg is.

**3. Admin Paneel (`/admin`)**
- Login pagina met Supabase Auth (email/password)
- Protected route: alleen toegankelijk met `admin` rol
- Overzichtspagina per sectie met bewerkbare velden
- Inline editing per taal (NL/FR tabs)
- Afbeeldingen uploaden naar Supabase Storage
- Reviews beheren (toevoegen, verwijderen, volgorde wijzigen, zichtbaarheid)
- Live preview link

### Stappen

1. **Lovable Cloud activeren** en database tabellen aanmaken (`site_content`, `site_images`, `reviews`, `user_roles`)
2. **RLS policies en seed data** — vul de tabellen met de huidige hardcoded content als initiële data
3. **`useContent` hook** bouwen met React Query + Supabase client
4. **Alle secties refactoren** om content uit de hook te lezen i.p.v. hardcoded strings
5. **Admin pagina bouwen** met login, content-editor per sectie, image upload, review management
6. **Storage bucket** aanmaken voor afbeeldingen met publieke leestoegang

### Vereisten

- Lovable Cloud of externe Supabase connectie moet geactiveerd worden
- Eerste admin-gebruiker moet handmatig aangemaakt worden (of via sign-up + rol toekenning)

