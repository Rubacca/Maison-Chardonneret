

## Plan: Match Booking Page to Commandeurshuisje Reference

### Root Cause

The Recranet widget uses **Shadow DOM** (web components). All CSS selectors targeting internal classes like `.mat-mdc-raised-button`, `.mat-calendar-body-selected`, `.mdc-tab-indicator__content--underline` etc. **cannot penetrate the shadow boundary** and are completely ignored by the browser. Only CSS custom properties (`--recranet-primary` etc.) cross shadow DOM. This is why the page looks nothing like the reference despite all the CSS overrides.

### What the Reference Does Right

From the screenshot of commandeurshuisje.nl:

1. **White/light background** throughout -- the page background matches the widget's internal white, creating a seamless look
2. **Light, elegant hero** -- "RESERVEREN" tagline in spaced caps, large serif "Boek uw verblijf" title, subtle description, all on a light/white background (not a dark banner)
3. **No CSS overrides** -- they only set CSS custom properties on the host element and let the widget handle everything else
4. **Clean, minimal header** -- centered logo, hamburger menu on left, lang toggle and CTA button on right
5. **Widget fills the page** -- no extra padding or containers constraining it

### Changes to `public/boeken/index.html`

**1. Remove all dead CSS (lines 287-348)**
Delete every rule targeting shadow DOM internals: `.mat-mdc-raised-button`, `.mat-mdc-outlined-button`, `.mat-mdc-tab-indicator`, `.mat-calendar-body-selected`, `.mat-calendar-body-in-range`, `.mdc-line-ripple`, `h1/h2/h3` inside the widget, and `recranet-search-bar/basket/summary` rules. These have zero effect.

**2. Switch background to white**
Change `body` background from `#FAF8F5` (cream) to `#FFFFFF` to seamlessly blend with the widget's white internal background.

**3. Redesign hero to match reference**
Replace the dark (`#3A3A3A`) hero banner with a light/white section:
- Spaced uppercase tagline in muted color
- Large serif title
- Optional subtle description line
- More vertical padding, matching the reference's elegant spacing

**4. Keep only CSS custom properties on widget host**
The `recranet-accommodations` element keeps `--recranet-primary: #8B9D83` and font-family. Remove all other properties that don't actually work.

**5. Add "BOEK" CTA button to header**
Like the reference, add a prominent booking CTA button styled in brand sage color next to the language toggle.

**6. Full-width widget container**
Remove `max-width: 1200px` from `.widget-section` -- let the widget manage its own internal max-width like the reference does.

### Summary

| Area | Action |
|------|--------|
| Dead CSS | Remove ~60 lines of shadow-DOM-blocked overrides |
| Background | White (`#FFF`) instead of cream |
| Hero | Light/elegant instead of dark banner |
| Widget host | Keep only CSS custom properties |
| Header | Add "BOEK" CTA button |
| Widget container | Full-width, no constraining max-width |

Single file change: `public/boeken/index.html`

