import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { text: "De rust en authenticiteit waren onbetaalbaar.", author: "Sophie", country: "BE" },
  { text: "Prachtig ingericht met oog voor detail.", author: "Mark", country: "NL" },
  { text: "Echt offline kunnen gaan, heerlijk!", author: "Anna", country: "FR" },
  { text: "De brocante stijl voelt warm en authentiek.", author: "Peter", country: "NL" },
  { text: "Perfect voor ons gezin.", author: "Lisa", country: "BE" },
  { text: "De omgeving is prachtig voor wandelingen.", author: "Tom", country: "NL" },
  { text: "Een verborgen parel in de Ardennen.", author: "Sarah", country: "DE" },
];

const ReviewCard = ({ text, author, country }: { text: string; author: string; country: string }) => (
  <div className="flex-shrink-0 w-80 bg-card rounded-md p-6 shadow-md border border-border mx-4">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="fill-brand-clay text-brand-clay" />
      ))}
    </div>
    <p className="font-serif text-lg text-card-foreground italic mb-4">"{text}"</p>
    <p className="font-sans text-sm text-muted-foreground">
      — {author}, {country}
    </p>
  </div>
);

export const SocialProofSection = () => {
  return (
    <section className="py-20 bg-muted overflow-hidden">
      <div className="text-center mb-12 px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4"
        >
          Ervaringen
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl text-foreground"
        >
          Wat onze gasten zeggen
        </motion.h2>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};