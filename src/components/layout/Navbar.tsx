import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "./Container";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useContent } from "@/hooks/useContent";

interface NavbarProps {
  currentLang: "nl" | "fr";
  onLangChange: (lang: "nl" | "fr") => void;
}

export const Navbar = ({ currentLang, onLangChange }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { handleAnchorClick } = useSmoothScroll();
  const { getT } = useContent(currentLang);

  const navLinks = [
    { label: getT("navbar", "home", "Home"), href: "#home" },
    { label: getT("navbar", "het_huis", "Het Huis"), href: "#huis" },
    { label: getT("navbar", "omgeving", "Omgeving"), href: "#omgeving" },
    { label: getT("navbar", "boeken", "Boeken"), href: "/boeken" },
    { label: getT("navbar", "contact", "Contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const isHomePage = location.pathname === "/";
  const scrolledOrNotHome = isScrolled || !isHomePage;

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (isHomePage) {
        handleAnchorClick(e, href);
      } else {
        e.preventDefault();
        window.location.href = "/" + href;
      }
      setIsOpen(false);
    }
  }, [isHomePage, handleAnchorClick]);

  const navLinkClass = () =>
    `font-sans text-sm transition-colors relative group ${
      scrolledOrNotHome ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
    }`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolledOrNotHome ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Hoofdnavigatie">
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className={`font-serif text-xl md:text-2xl transition-colors ${scrolledOrNotHome ? "text-foreground" : "text-white"}`}>
              Maison Chardonneret
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.href.startsWith("#") ? (e) => handleNavClick(e, link.href) : undefined}
                className={navLinkClass()}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-sage group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className={`flex items-center gap-1 rounded-md p-1 ${scrolledOrNotHome ? "bg-muted" : "bg-white/10"}`} role="group" aria-label="Taalkeuze">
              <button
                onClick={() => onLangChange("nl")}
                aria-pressed={currentLang === "nl"}
                aria-label="Nederlands"
                className={`px-3 py-1 text-sm rounded-sm transition-colors ${
                  currentLang === "nl"
                    ? scrolledOrNotHome ? "bg-background text-foreground shadow-sm" : "bg-white text-brand-dark shadow-sm"
                    : scrolledOrNotHome ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                }`}
              >
                NL
              </button>
              <button
                onClick={() => onLangChange("fr")}
                aria-pressed={currentLang === "fr"}
                aria-label="Français"
                className={`px-3 py-1 text-sm rounded-sm transition-colors ${
                  currentLang === "fr"
                    ? scrolledOrNotHome ? "bg-background text-foreground shadow-sm" : "bg-white text-brand-dark shadow-sm"
                    : scrolledOrNotHome ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                }`}
              >
                FR
              </button>
            </div>
            <a href="/boeken/">
              <AnimatedButton variant="secondary" size="sm">
                {getT("navbar", "reserveren", "Reserveren")}
              </AnimatedButton>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${scrolledOrNotHome ? "text-foreground" : "text-white"}`}
            aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-border"
            role="dialog"
            aria-label="Navigatiemenu"
          >
            <Container>
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={link.href.startsWith("#") ? (e) => handleNavClick(e, link.href) : undefined}
                    className="block font-sans text-foreground/80 hover:text-foreground py-2 text-lg"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-2 py-4 border-t border-border" role="group" aria-label="Taalkeuze">
                  <span className="text-sm text-muted-foreground">Taal:</span>
                  <button
                    onClick={() => onLangChange("nl")}
                    aria-pressed={currentLang === "nl"}
                    className={`px-4 py-2 text-sm rounded-sm transition-colors ${currentLang === "nl" ? "bg-brand-sage text-white" : "bg-muted text-foreground"}`}
                  >
                    NL
                  </button>
                  <button
                    onClick={() => onLangChange("fr")}
                    aria-pressed={currentLang === "fr"}
                    className={`px-4 py-2 text-sm rounded-sm transition-colors ${currentLang === "fr" ? "bg-brand-sage text-white" : "bg-muted text-foreground"}`}
                  >
                    FR
                  </button>
                </div>
                <a href="/boeken/" className="block">
                  <AnimatedButton variant="secondary" size="md" className="w-full">
                    {getT("navbar", "reserveren", "Reserveren")}
                  </AnimatedButton>
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
