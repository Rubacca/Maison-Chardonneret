import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { AnimatedButton } from "@/components/ui/animated-button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Het Huis", href: "#huis" },
  { label: "Omgeving", href: "#omgeving" },
  { label: "Boeken", href: "#boeken" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  currentLang: "nl" | "fr";
  onLangChange: (lang: "nl" | "fr") => void;
}

export const Navbar = ({ currentLang, onLangChange }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl text-foreground">
              Maison Chardonneret
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-sage group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side: Language toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <button
                onClick={() => onLangChange("nl")}
                className={`px-3 py-1 text-sm rounded-sm transition-colors ${
                  currentLang === "nl"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                NL
              </button>
              <button
                onClick={() => onLangChange("fr")}
                className={`px-3 py-1 text-sm rounded-sm transition-colors ${
                  currentLang === "fr"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
            </div>

            <AnimatedButton variant="secondary" size="sm">
              Reserveren
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/10"
          >
            <Container>
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block font-sans text-foreground/80 hover:text-foreground py-2"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Language Toggle */}
                <div className="flex items-center gap-2 py-2">
                  <span className="text-sm text-muted-foreground">Taal:</span>
                  <button
                    onClick={() => onLangChange("nl")}
                    className={`px-3 py-1 text-sm rounded-sm ${
                      currentLang === "nl" ? "bg-brand-sage text-white" : "text-foreground"
                    }`}
                  >
                    NL
                  </button>
                  <button
                    onClick={() => onLangChange("fr")}
                    className={`px-3 py-1 text-sm rounded-sm ${
                      currentLang === "fr" ? "bg-brand-sage text-white" : "text-foreground"
                    }`}
                  >
                    FR
                  </button>
                </div>

                <AnimatedButton variant="secondary" size="md" className="w-full">
                  Reserveren
                </AnimatedButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};