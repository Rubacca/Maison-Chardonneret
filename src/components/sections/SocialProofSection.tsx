import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { useLang } from "@/contexts/LangContext";

const ReviewCard = ({ text, author, country }: { text: string; author: string; country: string }) => (
  <div className="flex-shrink-0 w-72 sm:w-80 bg-card rounded-md p-5 sm:p-6 shadow-md border border-border mx-3 sm:mx-4">
    <div className="flex gap-1 mb-3 sm:mb-4" aria-label="5 van 5 sterren">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-brand-clay text-brand-clay sm:w-4 sm:h-4" aria-hidden="true" />
      ))}
    </div>
    <p className="font-serif text-base sm:text-lg text-card-foreground italic mb-3 sm:mb-4">"{text}"</p>
    <p className="font-sans text-xs sm:text-sm text-muted-foreground">— {author}, {country}</p>
  </div>
);

export const SocialProofSection = () => {
  const { lang } = useLang();
  const { getT, reviews } = useContent(lang);

  const displayReviews = reviews.length > 0
    ? reviews
    : [
        { text: "De rust en authenticiteit waren onbetaalbaar.", author: "Sophie", country: "BE" },
        { text: "Prachtig ingericht met oog voor detail.", author: "Mark", country: "NL" },
        { text: "Echt offline kunnen gaan, heerlijk!", author: "Anna", country: "FR" },
      ].map((r, i) => ({ ...r, id: String(i), text_nl: r.text, text_fr: r.text, sort_order: i, visible: true }));

  const tripleReviews = [...displayReviews, ...displayReviews, ...displayReviews];

  return (
    <section className="py-16 sm:py-20 bg-muted overflow-hidden" aria-label="Gastenbeoordelingen">
      <div className="text-center mb-10 sm:mb-12 px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4"
        >
          {getT("social", "label", "Ervaringen")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground"
        >
          {getT("social", "title", "Wat onze gasten zeggen")}
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
        
        <div 
          className="flex animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4"
          aria-live="off"
        >
          {tripleReviews.map((review, index) => (
            <ReviewCard key={index} text={review.text} author={review.author} country={review.country} />
          ))}
        </div>
      </div>
    </section>
  );
};
