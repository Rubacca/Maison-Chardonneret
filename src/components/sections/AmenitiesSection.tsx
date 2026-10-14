import { motion } from "framer-motion";
import { Users, BedDouble, Bath, CookingPot, Sun, Gift, Leaf, Trees } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useLang } from "@/contexts/LangContext";
import { useContent } from "@/hooks/useContent";

const items = [
  { icon: Users, key: "a1", nl: "4 personen, 6 op aanvraag", fr: "4 personnes, 6 sur demande" },
  { icon: BedDouble, key: "a2", nl: "2 slaapkamers", fr: "2 chambres" },
  { icon: Bath, key: "a3", nl: "1 badkamer en 2 toiletten", fr: "1 salle de bain et 2 toilettes" },
  { icon: CookingPot, key: "a4", nl: "Volledig ingerichte keuken", fr: "Cuisine entièrement équipée" },
  { icon: Sun, key: "a5", nl: "Serre met uitzicht", fr: "Véranda avec vue" },
  { icon: Gift, key: "a6", nl: "Welkomstpakket bij aankomst", fr: "Panier de bienvenue à l'arrivée" },
  { icon: Leaf, key: "a7", nl: "Energiezuinig huis", fr: "Maison économe en énergie" },
  { icon: Trees, key: "a8", nl: "Midden in de Ardense natuur", fr: "Au cœur de la nature ardennaise" },
];

export const AmenitiesSection = () => {
  const { lang } = useLang();
  const { getT } = useContent(lang);

  return (
    <section id="voorzieningen" className="py-16 sm:py-24 bg-brand-cream/40">
      <Container size="md">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4">
            {getT("amenities", "label", lang === "fr" ? "Équipements" : "Voorzieningen")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground">
            {getT("amenities", "title", lang === "fr" ? "Tout pour un séjour serein" : "Alles voor een zorgeloos verblijf")}
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          {items.map(({ icon: Icon, key, nl, fr }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-4 border-b border-brand-sage/20 pb-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-sage/15 text-brand-sage">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-sans text-foreground">{getT("amenities", key, lang === "fr" ? fr : nl)}</span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
