import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "./Container";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Het Huis", href: "#huis" },
  { label: "Omgeving", href: "#omgeving" },
  { label: "Boeken", href: "/boeken" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  currentLang: "nl" | "fr";
  onLangChange: (lang: "nl" | "fr") => void;
}

export const Navbar = ({ currentLang, onLangChange }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { handleAnchorClick } = useSmoothScroll();

  // Handle scroll state for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (isHomePage) {
        handleAnchorClick(e, href);
      } else {
        // Navigate to home page with hash
        e.preventDefault();
        window.location.href = "/" + href;
      }
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className={`font-serif text-xl md:text-2xl transition-colors ${
              isScrolled || !isHomePage ? "text-foreground" : "text-white"
            }`}>
              Maison Chardonneret
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-sm transition-colors relative group ${
                    isScrolled || !isHomePage
                      ? "text-foreground/80 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-sage group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-sans text-sm transition-colors relative group ${
                    isScrolled || !isHomePage
                      ? "text-foreground/80 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-sage group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
          </div>

          {/* Right side: Language toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <div className={`flex items-center gap-1 rounded-md p-1 ${
              isScrolled || !isHomePage ? "bg-muted" : "bg-white/10"
            }`}>
              <button
                onClick={() => onLangChange("nl")}
                className={`px-3 py-1 text-sm rounded-sm transition-colors ${
                  currentLang === "nl"
                    ? isScrolled || !isHomePage
                      ? "bg-background text-foreground shadow-sm"
                      : "bg-white text-brand-dark shadow-sm"
                    : isScrolled || !isHomePage
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                NL
              </button>
              <button
                onClick={() => onLangChange("fr")}
                className={`px-3 py-1 text-sm rounded-sm transition-colors ${
                  currentLang === "fr"
                    ? isScrolled || !isHomePage
                      ? "bg-background text-foreground shadow-sm"
                      : "bg-white text-brand-dark shadow-sm"
                    : isScrolled || !isHomePage
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                FR
              </button>
            </div>

            <a href="/boeken/">
              <AnimatedButton variant="secondary" size="sm">
                Reserveren
              </AnimatedButton>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${
              isScrolled || !isHomePage ? "text-foreground" : "text-white"
            }`}
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
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <Container>
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  link.href.startsWith("/") ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block font-sans text-foreground/80 hover:text-foreground py-2 text-lg"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block font-sans text-foreground/80 hover:text-foreground py-2 text-lg"
                    >
                      {link.label}
                    </a>
                  )
                ))}
                
                {/* Mobile Language Toggle */}
                <div className="flex items-center gap-2 py-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Taal:</span>
                  <button
                    onClick={() => onLangChange("nl")}
                    className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                      currentLang === "nl" ? "bg-brand-sage text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    NL
                  </button>
                  <button
                    onClick={() => onLangChange("fr")}
                    className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                      currentLang === "fr" ? "bg-brand-sage text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    FR
                  </button>
                </div>

                <a href="/boeken/" className="block">
                  <AnimatedButton variant="secondary" size="md" className="w-full">
                    Reserveren
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