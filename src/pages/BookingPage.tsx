import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Calendar, Users, Home, Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

type SDKStatus = "loading" | "loaded" | "error" | "timeout";

const BookingPage = () => {
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">(() => {
    // Check URL for language param on initial load
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");
    return langParam === "fr" ? "fr" : "nl";
  });
  
  const [sdkStatus, setSdkStatus] = useState<SDKStatus>("loading");
  const [sdkError, setSdkError] = useState<string | null>(null);
  const [widgetReady, setWidgetReady] = useState(false);

  // Load Recranet SDK dynamically
  const loadRecranetSDK = useCallback((lang: "nl" | "fr") => {
    setSdkStatus("loading");
    setSdkError(null);
    setWidgetReady(false);

    // Recranet SDK requires base href to be set to the booking page path
    // Dynamically update the base href for this page
    let baseEl = document.querySelector('base');
    const originalBaseHref = baseEl?.getAttribute('href') || '/';
    if (baseEl) {
      baseEl.setAttribute('href', '/boeken');
    } else {
      baseEl = document.createElement('base');
      baseEl.setAttribute('href', '/boeken');
      document.head.prepend(baseEl);
    }
    console.log("[Recranet] Base href set to /boeken");

    // Set up Recranet config
    window.recranetConfig = {
      organization: 1640,
      locale: lang,
      currency: "EUR",
    };

    console.log("[Recranet] Config set:", window.recranetConfig);

    // Remove any existing SDK script(s)
    document
      .querySelectorAll('script[src*="static.recranet.com/elements"]')
      .forEach((s) => s.remove());

    // Timeout fallback
    const timeoutId = window.setTimeout(() => {
      console.warn("[Recranet] SDK loading timed out after 15 seconds");
      setSdkStatus("timeout");
      setSdkError("Booking system is taking longer than expected to load.");
    }, 15000);

    // Create and load new SDK script
    const script = document.createElement("script");
    const timestamp = Date.now();
    script.src = `https://static.recranet.com/elements/${lang}/sdk.js?v=${timestamp}`;
    script.async = true;

    script.onload = () => {
      console.log("[Recranet] SDK script loaded successfully");
      window.clearTimeout(timeoutId);
      setSdkStatus("loaded");
      
      // Give the SDK a moment to initialize, then show widget area
      // The SDK may register elements lazily or on-demand
      window.setTimeout(() => {
        const elementName = "recranet-accommodations";
        const isDefined = customElements.get(elementName);
        console.log(`[Recranet] Custom element '${elementName}' defined:`, !!isDefined);
        
        // Inject styles into Recranet shadow DOM if accessible
        const recranetEl = document.querySelector('recranet-accommodations');
        if (recranetEl?.shadowRoot) {
          const style = document.createElement('style');
          style.textContent = `
            * { color: #3A3A3A !important; -webkit-text-fill-color: #3A3A3A !important; }
            input, select, textarea { color: #3A3A3A !important; background: #fff !important; }
            label, .mat-label, [class*="label"] { color: #555 !important; opacity: 1 !important; }
            button { background: #8B9D83 !important; color: #fff !important; }
          `;
          recranetEl.shadowRoot.appendChild(style);
          console.log("[Recranet] Injected styles into shadow DOM");
        } else {
          console.log("[Recranet] No shadow root found or not accessible");
        }
        
        setWidgetReady(true);
      }, 2000);
    };

    script.onerror = (e) => {
      console.error("[Recranet] SDK script failed to load:", e);
      setSdkStatus("error");
      setSdkError("Failed to load booking system. Please refresh the page.");
      window.clearTimeout(timeoutId);
    };

    document.body.appendChild(script);
    console.log("[Recranet] SDK script injected:", script.src);

    return () => {
      window.clearTimeout(timeoutId);
      // Restore original base href when unmounting
      const baseEl = document.querySelector('base');
      if (baseEl) {
        baseEl.setAttribute('href', '/');
        console.log("[Recranet] Base href restored to /");
      }
    };
  }, []);

  // Load SDK on mount
  useEffect(() => {
    const cleanup = loadRecranetSDK(currentLang);
    return cleanup;
  }, []); // Only on mount

  // Handle language change with page reload for SDK
  const handleLangChange = (newLang: "nl" | "fr") => {
    if (newLang !== currentLang) {
      // Update URL and reload to ensure correct SDK language
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
      error: "Er is een probleem opgetreden",
      retry: "Probeer opnieuw"
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
      error: "Un problème est survenu",
      retry: "Réessayer"
    }
  };

  const t = content[currentLang];

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
              {/* Recranet element should exist in the DOM while the SDK initializes */}
              <recranet-accommodations className="recranet-element" />

              {/* Loading overlay */}
              {!widgetReady && sdkStatus !== "error" && sdkStatus !== "timeout" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 bg-background/80">
                  <Loader2 className="w-12 h-12 text-brand-sage animate-spin" />
                  <p className="font-sans text-muted-foreground">{t.loading}</p>
                </div>
              )}

              {/* Error overlay */}
              {(sdkStatus === "error" || sdkStatus === "timeout") && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 bg-background/80">
                  <Alert variant="destructive" className="max-w-md">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{sdkError || t.error}</AlertDescription>
                  </Alert>
                  <button
                    onClick={() => loadRecranetSDK(currentLang)}
                    className="mt-4 px-6 py-2 bg-brand-sage text-white rounded-md hover:bg-brand-sage/90 transition-colors font-sans text-sm"
                  >
                    {t.retry}
                  </button>
                </div>
              )}
            </div>
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

      <Footer currentLang={currentLang} onLangChange={handleLangChange} />
    </div>
  );
};

export default BookingPage;
