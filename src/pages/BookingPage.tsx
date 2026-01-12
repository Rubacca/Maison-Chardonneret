import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Calendar, Users, Home } from "lucide-react";

const BookingPage = () => {
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">("nl");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Get the correct Recranet URL based on language
  const recranetUrl = currentLang === "nl" 
    ? "https://maison-chardonneret-elegant.recranet.com/nl/"
    : "https://maison-chardonneret-elegant.recranet.com/fr/";

  useEffect(() => {
    // Handle iframe resize messages if Recranet supports it
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data.height === "number" && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
              Reserveren
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Boek uw verblijf
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
              Kies uw data en ontdek de beschikbaarheid van Maison Chardonneret Elegant
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
                <p className="font-sans text-sm font-medium text-foreground">Volledige woning</p>
                <p className="font-sans text-xs text-muted-foreground">5 slaapkamers, 3 badkamers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center">
                <Users size={20} className="text-brand-sage" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-foreground">Max. 10 gasten</p>
                <p className="font-sans text-xs text-muted-foreground">Ideaal voor families</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center">
                <Calendar size={20} className="text-brand-sage" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-foreground">Min. 2 nachten</p>
                <p className="font-sans text-xs text-muted-foreground">Weekend of midweek</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking Iframe Section */}
      <section className="py-12 md:py-16 bg-background">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-md shadow-xl border border-border overflow-hidden"
          >
            {/* Loading State */}
            {!iframeLoaded && (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-brand-sage/30 border-t-brand-sage rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-sans text-muted-foreground">Beschikbaarheid laden...</p>
                </div>
              </div>
            )}
            
            {/* Recranet Booking Iframe */}
            <iframe
              ref={iframeRef}
              src={recranetUrl}
              title="Boekingssysteem Maison Chardonneret Elegant"
              className={`w-full border-0 ${iframeLoaded ? "block" : "hidden"}`}
              style={{ minHeight: "850px" }}
              onLoad={() => setIframeLoaded(true)}
              allow="payment"
            />
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center font-sans text-sm text-muted-foreground mt-6"
          >
            Heeft u vragen over uw reservering? Neem gerust{" "}
            <a href="#contact" className="text-brand-sage hover:underline">
              contact
            </a>{" "}
            met ons op.
          </motion.p>
        </Container>
      </section>

      <Footer currentLang={currentLang} onLangChange={setCurrentLang} />
    </div>
  );
};

export default BookingPage;