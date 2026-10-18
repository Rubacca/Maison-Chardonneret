# Maison Chardonneret

Will this work?

This analysis highlights a common tension in AI prompting: Narrative (ChatGPT) vs. Technical (Gemini/Claude).

The "Claude" prompt you provided is very strong, but for Lovable specifically, it has two minor risks:

Over-prescriptive JSX: Writing out <div className="..."> inside a prompt can sometimes confuse the AI if the AI's internal component library differs. It's better to describe the outcome and let the AI write the syntax.

Hex Codes vs. Tailwind: Lovable runs fastest on standard Tailwind classes. Hardcoded Hex values (#8B9D83) work better if defined in a "Theme Configuration" section rather than inline.

The Strategy
I will generate the Ultimate Lovable Prompt by refining the "Claude" version. I will:

Keep the specific content (the 7 reviews, the 4 USPs).

Keep the logic for the Recranet Iframe (crucial).

Improve the design instructions by defining a Tailwind Config section at the start, ensuring the "Brocante" colors are applied globally, not just on specific elements.

Simplify the animation instructions to "Behavior" rules, allowing Lovable to pick the best Framer Motion implementation.

Here is the visualization of the site structure we are about to build:

🔧 The Ultimate Lovable Prompt
Copy and paste the text below directly into Lovable.dev.

Markdown

# Project: Maison Chardonneret Elegant - Official Website

## 1. Role & Tech Stack
You are a Senior Frontend Engineer and UI Designer. Build a premium, high-conversion holiday home website.
- **Framework:** React + Tailwind CSS + Lucide Icons.
- **Animation:** Use `framer-motion` for sophisticated entrance animations.
- **Vibe:** "Brocante Chic" — Elegant, rustic, calm, and high-end.
- **Languages:** Primary Dutch (NL), UI support for French (FR).

## 2. Design System & Theme Configuration
**Configure the tailwind.config.js with these specific brand colors:**
- `brand-dark`: '#3A3A3A' (Deep Stone)
- `brand-cream`: '#FAF8F5' (Warm Background)
- `brand-sage`: '#8B9D83' (Nature Accent)
- `brand-clay`: '#C9A588' (Warm Earth/Terracotta)

**Global Styles:**
- **Typography:** Use a sophisticated Serif (like *Playfair Display*) for all Headings. Use a clean Sans-Serif (like *Inter*) for Body text.
- **Radius:** Use `rounded-sm` or `rounded-md` (avoid fully rounded pills to keep it rustic).
- **Shadows:** Soft, diffused shadows (`shadow-lg` with low opacity).

---

## 3. Homepage Architecture (Strict Order)

### Section A: Hero (The Hook)
- **Background:** Full-screen video container (muted/loop). Use a placeholder image of "Misty Ardennes Forest" if video is loading. Add a `bg-black/30` overlay.
- **Content (Centered):**
  - **H1:** "Maison Chardonneret Elegant" (Serif, White, text-5xl md:text-7xl).
  - **H2:** "Tijdloze rust in het hart van de Ardennen" (Sans, White, text-xl).
  - **Primary CTA:** Button "Bekijk beschikbaarheid". Style: `bg-brand-cream` text `brand-dark`, hover `scale-105`.
  - **Animation:** Text fades up slowly (`duration-1000`).

### Section B: Interactive Intro (The Story)
- **Layout:** Split screen (Text Left, Image Right).
- **Interaction:** Trigger animations when in view (`whileInView`).
- **Text:** "Een authentieke ontsnapping. Ontdek onze gîte voor 10 personen, ingericht in stijlvolle brocante sfeer in Orchimont."
- **Image Effect:** Two images stacked with a slight overlap. When scrolled into view, they slide in from the right and settle into place.

### Section C: Social Proof (Infinite Review Scroll)
- **Component:** A horizontal marquee slider that moves slowly and infinitely.
- **Cards:** White paper-style cards, `shadow-md`.
- **Content:** Use these exact reviews:
  1. "De rust en authenticiteit waren onbetaalbaar." – Sophie, BE
  2. "Prachtig ingericht met oog voor detail." – Mark, NL
  3. "Echt offline kunnen gaan, heerlijk!" – Anna, FR
  4. "De brocante stijl voelt warm en authentiek." – Peter, NL
  5. "Perfect voor ons gezin." – Lisa, BE
  6. "De omgeving is prachtig voor wandelingen." – Tom, NL
  7. "Een verborgen parel in de Ardennen." – Sarah, DE

### Section D: Feature Cards (Pop-up Hover)
- **Layout:** 3 Columns.
- **Cards:** 1. Het Vakantiehuis, 2. De Omgeving, 3. Activiteiten.
- **Interaction:** On Hover -> Card translates Y -10px, shadow increases, background image zooms slightly (110%).
- **Visual:** Text overlaid on dark gradient at the bottom of the card.

### Section E: The USPs (Iconography)
- **Layout:** 4 Columns (2x2 on mobile).
- **Icons:** Use Lucide React icons.
- **Data:**
  1. `Armchair` -> "Brocante Stijl"
  2. `Leaf` -> "Energiezuinig"
  3. `Trees` -> "Genesteld in de Natuur"
  4. `WifiOff` -> "Echt Offline Gaan"

### Section F: Location
- **Component:** Full-width map section.
- **Overlay:** A floating white card in the corner: "Rue du Chardonneret, Orchimont".

### Section G: Footer
- **Background:** `bg-brand-dark` (Dark Stone).
- **Text:** White/Gray.
- **Elements:** Logo, Quick Links, Contact Info, Language Toggle [NL/FR].

---

## 4. Booking Integration (Critical)
Create a dedicated "Booking" page or section.
- **Component:** A Responsive Iframe Wrapper.
- **Source:** `https://maison-chardonneret-elegant.recranet.com/nl/`
- **Styling:** The iframe must have `width="100%"`, `frameBorder="0"`.
- **Logic:** Implement a script to auto-resize the iframe height based on content if possible, otherwise set `min-height="850px"`.
- **Note:** Ensure the iframe looks like a native part of the site (no double scrollbars).

## 5. Technical Requirements
- **Navigation:** Sticky Navbar with Glassmorphism (`backdrop-blur`).
- **Mobile:** All grids must stack vertically on mobile.
- **Language:** Create a UI toggle in the Navbar. For this MVP, hardcode the Dutch text but set up the state structure to swap to French strings later.

---

**Generate the complete project structure, components, and the main landing page now.**

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://prompt-craft-08.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6dbb83ed-dd0f-4e99-b4cc-0dc8585c4121).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
