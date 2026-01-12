import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

const Index = () => {
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">("nl");

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={currentLang} onLangChange={setCurrentLang} />
      <HeroSection />
      
      {/* Placeholder for next sections */}
      <section className="py-32 bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">
            ✓ Phase 2 Complete: Navbar + Hero Section
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;