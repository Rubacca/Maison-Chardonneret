import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { USPSection } from "@/components/sections/USPSection";
import { LocationSection } from "@/components/sections/LocationSection";

const Index = () => {
  const [currentLang, setCurrentLang] = useState<"nl" | "fr">("nl");

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={currentLang} onLangChange={setCurrentLang} />
      <HeroSection />
      <IntroSection />
      <SocialProofSection />
      <FeatureCardsSection />
      <USPSection />
      <LocationSection />
    </div>
  );
};

export default Index;