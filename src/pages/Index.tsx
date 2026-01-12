import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Container } from "@/components/layout/Container";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Phase 1 Design System Preview */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="font-serif text-5xl md:text-7xl text-foreground">
              Maison Chardonneret Elegant
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
              Tijdloze rust in het hart van de Ardennen
            </p>
            
            {/* Color Palette Preview */}
            <div className="flex flex-wrap justify-center gap-4 py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-md bg-brand-dark shadow-lg" />
                <span className="text-sm text-muted-foreground">Deep Stone</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-md bg-brand-cream border shadow-lg" />
                <span className="text-sm text-muted-foreground">Warm Cream</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-md bg-brand-sage shadow-lg" />
                <span className="text-sm text-muted-foreground">Nature Sage</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-md bg-brand-clay shadow-lg" />
                <span className="text-sm text-muted-foreground">Warm Clay</span>
              </div>
            </div>

            {/* Button Variants */}
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton variant="secondary">
                Primary Action
              </AnimatedButton>
              <div className="bg-brand-dark p-4 rounded-md">
                <AnimatedButton variant="primary">
                  Bekijk beschikbaarheid
                </AnimatedButton>
              </div>
              <div className="bg-brand-dark p-4 rounded-md">
                <AnimatedButton variant="outline">
                  Outline Style
                </AnimatedButton>
              </div>
            </div>

            {/* Typography Preview */}
            <div className="pt-12 space-y-4 text-left max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl text-foreground">
                Typography System
              </h2>
              <h3 className="font-serif text-2xl text-foreground">
                Playfair Display for headings
              </h3>
              <p className="font-sans text-lg text-muted-foreground">
                Inter for body text — clean, readable, and modern. Perfect for longer descriptions and UI elements.
              </p>
              <p className="font-serif italic text-xl text-brand-sage">
                "Een authentieke ontsnapping."
              </p>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                ✓ Phase 1 Complete: Framer Motion, Brand Colors, Typography, Base Components
              </p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Index;