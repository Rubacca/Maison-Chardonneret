import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";

export const LocationSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-background">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-md overflow-hidden shadow-xl order-2 lg:order-1"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.90%2C49.87%2C4.97%2C49.90&layer=mapnik&marker=49.8833%2C4.9333"
              className="w-full h-full border-0"
              loading="lazy"
              title="Locatie Maison Chardonneret Elegant in Orchimont"
              allowFullScreen
            />
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div>
              <span className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4">
                Locatie
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-4">
                Vind ons in
                <br />
                <span className="italic text-brand-sage">Orchimont</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                Gelegen in het hart van de Belgische Ardennen, op slechts 2 uur 
                rijden van Brussel, Antwerpen en de Nederlandse grens.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-md border border-border">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-sage/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-sage" />
                </div>
                <div>
                  <h4 className="font-sans font-medium text-sm sm:text-base text-foreground">Adres</h4>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                    Rue du Chardonneret<br />
                    5560 Orchimont, België
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-md border border-border">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-sage/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-brand-sage" />
                </div>
                <div>
                  <h4 className="font-sans font-medium text-sm sm:text-base text-foreground">Telefoon</h4>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                    +32 (0)XX XXX XX XX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-md border border-border">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-sage/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-brand-sage" />
                </div>
                <div>
                  <h4 className="font-sans font-medium text-sm sm:text-base text-foreground">E-mail</h4>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                    info@maison-chardonneret.be
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};