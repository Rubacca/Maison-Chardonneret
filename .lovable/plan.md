

## Senior Full-Stack Review: Maison Chardonneret

### Architecture and Code Quality

**1. NotFound.tsx: Conditional Hook Call (Bug)**
The `useEffect` hook is called after an early return (`if (location.pathname.startsWith('/boeken'))`), violating React's rules of hooks. This will cause warnings/errors in development and unpredictable behavior.

**2. Language State Not Persisted**
`currentLang` lives in `useState("nl")` on `Index.tsx` and resets on every page load. There's no `localStorage`, URL param, or cookie persistence. The booking page uses URL params (`?lang=fr`), but the main site doesn't sync with it. Users switching languages lose their preference on navigation.

**3. Duplicate Recranet CSS**
Recranet widget CSS overrides exist in **both** `src/index.css` (lines 132-378) and `public/boeken/index.html` (lines 314-778). This duplication means:
- Maintenance burden (changes needed in two places)
- The `index.css` overrides load on *every* page, not just `/boeken/`
- Potential conflicts between the two sets of rules

**4. No SEO Sitemap**
`robots.txt` allows all crawlers but there's no `sitemap.xml`. For a vacation rental property, a sitemap with the homepage and booking page would help discoverability.

**5. No Structured Data (Schema.org)**
A vacation rental should have `LodgingBusiness` or `VacationRental` structured data for rich Google results (pricing, availability, location, reviews).

### Performance

**6. No Image Optimization**
All images are Unsplash URLs loaded at full resolution. No `srcset`, `sizes`, or WebP/AVIF format. The hero background image loads a 2070px wide image regardless of device. Consider:
- Using `<img>` with `srcset` and `sizes` for responsive images
- Adding `fetchpriority="high"` to hero image
- Using `loading="lazy"` (already done on some, but hero should eager-load)

**7. Framer Motion Bundle Size**
Every section imports `framer-motion` (12+ components). The library is ~32KB gzipped. Most animations are simple fade-ups that could use CSS `@keyframes` + Intersection Observer, saving significant bundle size. At minimum, use `LazyMotion` with `domAnimation` features.

**8. Font Loading Strategy**
Google Fonts loaded via `<link>` in both `index.html` and `public/boeken/index.html`. No `font-display: swap` control. Consider self-hosting fonts or adding `&display=swap` to the Google Fonts URL to prevent FOIT (Flash of Invisible Text).

### UX and Accessibility

**9. Missing Accessibility Attributes**
- Hero section: background image has no accessible text alternative (it's a CSS `backgroundImage`)
- FeatureCardsSection: cards with `cursor-pointer` but no `role="button"` or keyboard interaction
- SocialProofSection: marquee has no pause mechanism for users with motion sensitivity (`prefers-reduced-motion` not respected)
- Mobile menu: no focus trap when open
- Language toggle buttons: no `aria-label` or `aria-pressed`

**10. Placeholder Content**
- Phone number: `+32 (0)XX XXX XX XX` (placeholder)
- Social links: `href="#"` (non-functional)
- Map: stock Unsplash image instead of actual Google Maps / OpenStreetMap embed
- Reviews: appear to be fabricated with no link to actual review platform

**11. Marquee Animation Issues**
The review marquee only duplicates reviews once (`[...reviews, ...reviews]`), which may show a gap before looping. The CSS `marquee` animation runs at 40s linear infinite but there's no second copy to create seamless infinite scroll.

**12. No `prefers-reduced-motion` Support**
All animations (hero parallax, scroll reveals, marquee, hover effects) ignore `prefers-reduced-motion: reduce`. This is an accessibility concern.

### Security and Best Practices

**13. External Script Loading**
The Recranet SDK loads with cache-busting (`?v=Date.now()`), preventing browser caching entirely. This forces a re-download on every page load. Use a versioned URL instead.

**14. No CSP Headers**
No Content Security Policy configured. The site loads scripts from `static.recranet.com` and fonts from Google — a CSP would protect against XSS.

**15. No Error Boundaries**
No React Error Boundary wrapping the app. If any component throws, the entire page crashes with a white screen.

### Proposed Improvements (Priority Order)

| Priority | Issue | Fix |
|----------|-------|-----|
| **P0** | NotFound.tsx hook violation | Move `useEffect` before the conditional return |
| **P1** | Remove duplicate Recranet CSS from `index.css` | Keep only in `boeken/index.html` |
| **P1** | Persist language preference | Use `localStorage` + URL sync |
| **P1** | Add `prefers-reduced-motion` media query | Disable animations for users who prefer reduced motion |
| **P1** | Fix placeholder content | Add real phone, social links, or remove |
| **P2** | Add `&display=swap` to Google Fonts URLs | Both `index.html` files |
| **P2** | Add Error Boundary | Wrap `<App>` in an error boundary component |
| **P2** | Fix marquee for seamless looping | Add a third copy or use CSS-only approach |
| **P2** | Add structured data (JSON-LD) | `VacationRental` schema on homepage |
| **P2** | Hero image optimization | Use `<img>` with `srcset`, eager loading |
| **P3** | Add sitemap.xml | Static file with homepage + booking URLs |
| **P3** | Reduce framer-motion usage | Use `LazyMotion` or CSS animations |
| **P3** | Accessibility: aria labels, focus traps | Across Navbar, language toggles, feature cards |
| **P3** | Remove Recranet SDK cache-busting | Use versioned URL |

### Files to Change

| File | Changes |
|------|---------|
| `src/pages/NotFound.tsx` | Fix hook order violation |
| `src/index.css` | Remove all Recranet CSS overrides (lines 132-378) |
| `src/pages/Index.tsx` | Add language persistence via localStorage |
| `index.html` | Add `&display=swap`, structured data, error boundary |
| `public/boeken/index.html` | Fix SDK cache-busting, add `display=swap` |
| `src/App.tsx` | Add React Error Boundary |
| `src/components/sections/SocialProofSection.tsx` | Fix marquee seamless loop, add reduced-motion |
| `tailwind.config.ts` | Add `prefers-reduced-motion` variants |
| `public/sitemap.xml` | Create with page URLs |
| Multiple section components | Add accessibility attributes |

