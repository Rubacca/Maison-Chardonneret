import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export const IntroSection = () => {
  return (
    <section id="huis" className="py-24 md:py-32 bg-background overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage">
              Welkom
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Een authentieke
              <br />
              <span className="italic text-brand-sage">ontsnapping</span>
            </h2>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-lg">
              Ontdek onze gîte voor 10 personen, ingericht in stijlvolle brocante 
              sfeer in het pittoreske Orchimont. Waar tijd even stilstaat en de 
              natuur je omringt.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="space-y-1">
                <span className="font-serif text-3xl text-foreground">10</span>
                <p className="text-sm text-muted-foreground">Personen</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="space-y-1">
                <span className="font-serif text-3xl text-foreground">5</span>
                <p className="text-sm text-muted-foreground">Slaapkamers</p>
              </div>
              <div className="w-px bg-border hidden sm:block" />
              <div className="space-y-1">
                <span className="font-serif text-3xl text-foreground">3</span>
                <p className="text-sm text-muted-foreground">Badkamers</p>
              </div>
            </div>
          </motion.div>

          {/* Staggered Images */}
          <div className="relative h-[500px] lg:h-[600px]">
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 right-0 w-3/4 h-2/3 rounded-md overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop"
                alt="Interieur van het vakantiehuis"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-md overflow-hidden shadow-2xl border-4 border-background"
            >
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1470&auto=format&fit=crop"
                alt="Gezellige woonkamer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};