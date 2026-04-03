

## Plan: Improve Booking Page Based on Commandeurshuisje Reference

### Analysis

The Commandeurshuisje.nl reference site uses the **same Recranet widget** but integrates it far more cleanly. Key differences:

1. **They don't fight the widget** -- minimal CSS overrides, letting the Recranet Angular widget handle its own layout (photo grid, tabs, calendars, booking sidebar, reviews)
2. **Tab navigation** -- Details, Voorzieningen, Beschikbaarheid, Arrangementen, Locatie, Reviews tabs are native widget elements, not custom additions
3. **No duplicate content** -- No custom hero/quick-info bar duplicating what the widget already shows (accommodation name, guest count, rooms, etc.)
4. **Sticky booking panel** -- The widget's native booking sidebar works correctly because layout CSS isn't overridden
5. **Fallback hidden when widget loads** -- Only shown as a true fallback

### Current Problems

The current `public/boeken/index.html` has ~450 lines of aggressive `!important` CSS overrides targeting Angular Material classes, gallery layouts, calendar grids, form fields, tabs, and more. These overrides:
- Break the widget's responsive behavior
- Conflict with Angular Material's internal layout engine
- Force grid layouts that don't match the widget's DOM structure
- Make the page look "off" compared to native Recranet rendering

### Changes

**File: `public/boeken/index.html`**

1. **Strip layout-forcing CSS overrides** -- Remove all `!important` rules that override grid layouts, flex directions, calendar sizing, gallery grids, accommodation card layouts, and form field styling. Keep only:
   - Brand color CSS custom properties (`--recranet-primary`, etc.)
   - Font family declarations (Playfair Display for headings, Inter for body)
   - Button color overrides (sage green)
   - Tab indicator color
   - Basic border/radius theming

2. **Simplify the hero section** -- Reduce to a minimal banner (tagline + title only, remove subtitle) or remove entirely since the widget shows the accommodation name and description natively

3. **Remove the quick-info bar** -- The widget already displays guest count, rooms, and location in its Details tab

4. **Hide fallback conditionally** -- Add JavaScript to hide the fallback section once the Recranet widget renders successfully (check for content inside `recranet-accommodations` after a timeout)

5. **Let the widget breathe** -- Remove padding/margin constraints on `.widget-section` and `.widget-container`, give the widget full width with a max-width container matching the reference (~1200px centered)

6. **Preserve only color theming** -- The Recranet widget supports CSS custom properties. Set brand colors and let the widget handle the rest:
   ```css
   recranet-accommodations {
     --recranet-primary: #8B9D83;
     font-family: 'Inter', sans-serif;
   }
   ```

### Technical Summary

| Area | Action |
|------|--------|
| CSS overrides | Remove ~300 lines of layout-forcing `!important` rules |
| Color theming | Keep ~30 lines of brand color/font declarations |
| Hero section | Simplify to minimal banner |
| Quick-info bar | Remove (widget shows this natively) |
| Fallback section | Hide when widget loads via JS |
| Widget container | Max-width 1200px, centered, no padding constraints |

This will make the booking page render identically to the Commandeurshuisje reference -- clean, native Recranet widget behavior with brand-appropriate colors and fonts.

