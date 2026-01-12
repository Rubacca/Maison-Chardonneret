import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Calendar, Users, Home } from "lucide-react";

// Extend Window interface for Recranet config
declare global {
  interface Window {
    recranetConfig?: {
      organization: number;
      locale: string;
      currency: string;
    };
  }
}

const BookingPage = () => {
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">("nl");

  // Update Recranet locale when language changes
  useEffect(() => {
    if (window.recranetConfig) {
      window.recranetConfig.locale = currentLang;
    }
    
    // Update the SDK script source for the new language with cache-busting
    const existingScript = document.querySelector(
      'script[src*="static.recranet.com/elements"]'
    );
    if (existingScript) {
      const timestamp = Date.now();
      const newSrc = `https://static.recranet.com/elements/${currentLang}/sdk.js?v=${timestamp}`;
      if (!existingScript.getAttribute('src')?.includes(`/${currentLang}/`)) {
        existingScript.setAttribute('src', newSrc);
      }
    }
  }, [currentLang]);

  const content = {
    nl: {
      tagline: "Reserveren",
      title: "Boek uw verblijf",
      subtitle: "Kies uw data en ontdek de beschikbaarheid van Maison Chardonneret Elegant",
      fullHome: "Volledige woning",
      rooms: "5 slaapkamers, 3 badkamers",
      maxGuests: "Max. 10 gasten",
      idealFor: "Ideaal voor families",
      minNights: "Min. 2 nachten",
      weekendMidweek: "Weekend of midweek",
      helpText: "Heeft u vragen over uw reservering? Neem gerust",
      contact: "contact",
      withUs: "met ons op."
    },
    fr: {
      tagline: "Réservation",
      title: "Réservez votre séjour",
      subtitle: "Choisissez vos dates et découvrez la disponibilité de Maison Chardonneret Elegant",
      fullHome: "Maison entière",
      rooms: "5 chambres, 3 salles de bain",
      maxGuests: "Max. 10 invités",
      idealFor: "Idéal pour les familles",
      minNights: "Min. 2 nuits",
      weekendMidweek: "Week-end ou mi-semaine",
      helpText: "Avez-vous des questions sur votre réservation? N'hésitez pas à",
      contact: "nous contacter",
      withUs: "."
    }
  };

  const t = content[currentLang];

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={currentLang} onLangChange={setCurrentLang} />
      
      {/* Hero Banner */}
      <section className="pt-20 md:pt-24 pb-12 bg-brand-dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12 md:py-16"
          >
            <span className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4">
              {t.tagline}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {t.title}
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-muted border-b border-border">
        <Container>
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center">
                <Home size={20} className="text-brand-sage" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-foreground">{t.fullHome}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.rooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center">
                <Users size={20} className="text-brand-sage" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-foreground">{t.maxGuests}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.idealFor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center">
                <Calendar size={20} className="text-brand-sage" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-foreground">{t.minNights}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.weekendMidweek}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking Section with Recranet SDK */}
      <section className="py-12 md:py-16 bg-background">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-md shadow-xl border border-border overflow-hidden"
          >
            {/* Recranet Accommodations Element */}
            <div 
              className="min-h-[600px]"
              dangerouslySetInnerHTML={{ __html: '<recranet-accommodations class="recranet-element"></recranet-accommodations>' }}
            />
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center font-sans text-sm text-muted-foreground mt-6"
          >
            {t.helpText}{" "}
            <a href="/#contact" className="text-brand-sage hover:underline">
              {t.contact}
            </a>{" "}
            {t.withUs}
          </motion.p>
        </Container>
      </section>

      <Footer currentLang={currentLang} onLangChange={setCurrentLang} />
    </div>
  );
};

export default BookingPage;
