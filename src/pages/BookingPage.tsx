import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Calendar, Users, Home, Loader2 } from "lucide-react";

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
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");
    return langParam === "fr" ? "fr" : "nl";
  });
  
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Check if the Recranet custom element is defined
  useEffect(() => {
    const checkWidget = () => {
      const isDefined = customElements.get('recranet-accommodations');
      if (isDefined) {
        setWidgetLoaded(true);
      }
    };
    
    // Check immediately and then periodically
    checkWidget();
    const interval = setInterval(checkWidget, 500);
    
    // Stop checking after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Handle language change with page reload for SDK
  const handleLangChange = (newLang: "nl" | "fr") => {
    if (newLang !== currentLang) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLang);
      window.location.href = url.toString();
    }
  };

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
      withUs: "met ons op.",
      loading: "Beschikbaarheid laden...",
      directBooking: "Of boek direct via ons reserveringsportaal:",
      bookNow: "Direct boeken"
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
      withUs: ".",
      loading: "Chargement des disponibilités...",
      directBooking: "Ou réservez directement via notre portail de réservation:",
      bookNow: "Réserver maintenant"
    }
  };

  const t = content[currentLang];

  // Recranet portal URL for direct booking fallback
  const recranetPortalUrl = `https://maison-chardonneret-elegant.recranet.com/${currentLang}/accommodations`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={currentLang} onLangChange={handleLangChange} />
      
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
            <div className="relative min-h-[600px]">
              {/* Recranet widget - SDK is loaded statically from index.html */}
              <recranet-accommodations className="recranet-element" />
              
              {/* Loading indicator while widget initializes */}
              {!widgetLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 bg-background/90 pointer-events-none">
                  <Loader2 className="w-10 h-10 text-brand-sage animate-spin" />
                  <p className="font-sans text-muted-foreground">{t.loading}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Fallback direct booking link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 p-6 bg-muted rounded-lg border border-border"
          >
            <p className="font-sans text-sm text-muted-foreground mb-4">
              {t.directBooking}
            </p>
            <a
              href={recranetPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-sage text-white rounded-md hover:bg-brand-sage/90 transition-colors font-sans text-sm font-medium"
            >
              <Calendar size={18} />
              {t.bookNow}
            </a>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
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

      <Footer currentLang={currentLang} onLangChange={handleLangChange} />
    </div>
  );
};

export default BookingPage;
