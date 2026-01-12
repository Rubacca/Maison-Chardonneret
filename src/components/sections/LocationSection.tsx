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
            {/* Map background image as placeholder */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop"
              alt="Kaart locatie Orchimont"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-dark/20" />
            
            {/* Location Pin Overlay */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-sage rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-brand-sage rotate-45" />
              </div>
            </motion.div>
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