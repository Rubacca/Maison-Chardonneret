import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useContent } from "@/hooks/useContent";
import { useLang } from "@/contexts/LangContext";

export const IntroSection = () => {
  const { lang } = useLang();
  const { getT, getImage } = useContent(lang);
  const img1 = getImage("intro", "image_1", "/images/huiskamer-interieur.jpg", "Authentieke huiskamer");
  const img2 = getImage("intro", "image_2", "/images/keuken-interieur.jpg", "Authentieke keuken");

  return (
    <section id="huis" className="py-16 sm:py-24 md:py-32 bg-background overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <span className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage">
              {getT("intro", "label", "Welkom")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              {getT("intro", "title_line1", "Een authentieke")}
              <br />
              <span className="italic text-brand-sage">{getT("intro", "title_line2", "ontsnapping")}</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              {getT("intro", "description", "Ontdek onze charmante gîte voor 4 personen, ingericht in stijlvolle brocante sfeer in het pittoreske Orchimont. Met een optionele slaapbank in de tussenkamer is er ruimte voor maximaal 6 gasten — in overleg.")}
            </p>
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-4">
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-foreground">{getT("intro", "stat_persons", "4")}</span>
                <p className="text-xs sm:text-sm text-muted-foreground">{getT("intro", "stat_persons_label", "Gasten")}</p>
                <p className="text-[10px] sm:text-xs text-brand-sage">{getT("intro", "stat_persons_sub", "+2 op aanvraag")}</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-foreground">{getT("intro", "stat_bedrooms", "2")}</span>
                <p className="text-xs sm:text-sm text-muted-foreground">{getT("intro", "stat_bedrooms_label", "Slaapkamers")}</p>
                <p className="text-[10px] sm:text-xs text-brand-sage">{getT("intro", "stat_bedrooms_sub", "+1 tussenkamer met bedbank op aanvraag")}</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-foreground">{getT("intro", "stat_bathrooms", "1")}</span>
                <p className="text-xs sm:text-sm text-muted-foreground">{getT("intro", "stat_bathrooms_label", "Badkamer")}</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-foreground">{getT("intro", "stat_toilet", "2")}</span>
                <p className="text-xs sm:text-sm text-muted-foreground">{getT("intro", "stat_toilet_label", "Toiletten")}</p>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[350px] sm:h-[450px] lg:h-[600px] order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 right-0 w-[75%] sm:w-3/4 h-[60%] sm:h-2/3 rounded-md overflow-hidden shadow-2xl"
            >
              <img src={img1.url} alt={img1.alt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 left-0 w-[65%] sm:w-2/3 h-[45%] sm:h-1/2 rounded-md overflow-hidden shadow-2xl border-4 border-background"
            >
              <img src={img2.url} alt={img2.alt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
