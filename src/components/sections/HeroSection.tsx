import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export const HeroSection = () => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Welkom bij Maison Chardonneret Elegant"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-105"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block font-sans text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-brand-cream/80 mb-4">
            Vakantiewoning in de Ardennen
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 leading-tight"
        >
          Maison
          <br />
          <span className="italic">Chardonneret Elegant</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-base sm:text-lg md:text-xl text-brand-cream/90 max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
        >
          Tijdloze rust in het hart van de Ardennen
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/boeken">
            <AnimatedButton variant="primary" size="lg" className="w-full sm:w-auto">
              Bekijk beschikbaarheid
            </AnimatedButton>
          </Link>
          <a href="#huis" onClick={(e) => handleAnchorClick(e, "#huis")}>
            <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto">
              Ontdek meer
            </AnimatedButton>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block motion-reduce:hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-brand-cream/60 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-cream/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
