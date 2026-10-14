import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useLang } from "@/contexts/LangContext";

const photos = [
  { src: "/images/gevel-exterior.jpg", nl: "De gevel", fr: "La façade" },
  { src: "/images/huiskamer-interieur.jpg", nl: "De woonkamer", fr: "Le salon" },
  { src: "/images/keuken-interieur.jpg", nl: "De keuken", fr: "La cuisine" },
  { src: "/images/slaapkamer-brocante.jpg", nl: "Slaapkamer", fr: "Chambre" },
  { src: "/images/serre-uitzicht.jpg", nl: "Uitzicht vanuit de serre", fr: "Vue depuis la véranda" },
  { src: "/images/keuken-detail.jpg", nl: "Details in de keuken", fr: "Détails de la cuisine" },
  { src: "/images/welkomstpakket.jpg", nl: "Welkomstpakket", fr: "Panier de bienvenue" },
  { src: "/images/bossen-ardennen.jpg", nl: "De Ardense bossen", fr: "Les forêts ardennaises" },
];

export const GallerySection = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % photos.length)), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, next, prev]);

  const t = lang === "fr"
    ? { label: "Galerie", title: "Découvrez la maison", close: "Fermer", prev: "Précédente", next: "Suivante" }
    : { label: "Galerij", title: "Neem een kijkje binnen", close: "Sluiten", prev: "Vorige", next: "Volgende" };

  return (
    <section id="galerij" className="py-16 sm:py-24 bg-background">
      <Container size="md">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4">{t.label}</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground">{t.title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <motion.button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-md aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
              aria-label={p[lang]}
            >
              <img src={p.src} alt={p[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-left text-xs sm:text-sm font-sans text-white bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {p[lang]}
              </span>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button onClick={() => setOpen(null)} aria-label={t.close} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white">
              <X className="w-7 h-7" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label={t.prev} className="absolute left-2 sm:left-6 p-2 text-white/80 hover:text-white">
              <ChevronLeft className="w-9 h-9" />
            </button>
            <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={photos[open].src} alt={photos[open][lang]} className="w-full max-h-[80vh] object-contain rounded-md" />
              <figcaption className="mt-3 text-center text-sm font-sans text-white/80">
                {photos[open][lang]} · {open + 1}/{photos.length}
              </figcaption>
            </figure>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label={t.next} className="absolute right-2 sm:right-6 p-2 text-white/80 hover:text-white">
              <ChevronRight className="w-9 h-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
