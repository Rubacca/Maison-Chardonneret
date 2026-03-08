import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { USPSection } from "@/components/sections/USPSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { LangContext } from "@/contexts/LangContext";

const LANG_STORAGE_KEY = "maison-chardonneret-lang";

const Index = () => {
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return stored === "fr" ? "fr" : "nl";
  });

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return (
    <LangContext.Provider value={{ lang: currentLang, setLang: setCurrentLang }}>
      <div className="min-h-screen bg-background">
        <Navbar currentLang={currentLang} onLangChange={setCurrentLang} />
        <HeroSection />
        <IntroSection />
        <SocialProofSection />
        <FeatureCardsSection />
        <USPSection />
        <LocationSection />
        <Footer currentLang={currentLang} onLangChange={setCurrentLang} />
      </div>
    </LangContext.Provider>
  );
};

export default Index;
