import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Het Huis", href: "#huis" },
  { label: "Omgeving", href: "#omgeving" },
  { label: "Boeken", href: "/boeken" },
  { label: "Contact", href: "#contact" },
];

interface FooterProps {
  currentLang: "nl" | "fr";
  onLangChange: (lang: "nl" | "fr") => void;
}

export const Footer = ({ currentLang, onLangChange }: FooterProps) => {
  const { handleAnchorClick } = useSmoothScroll();

  return (
    <footer className="bg-brand-dark text-white">
      <Container>
        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <h3 className="font-serif text-xl sm:text-2xl mb-4">
                Maison Chardonneret
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
                Tijdloze rust in het hart van de Ardennen. Een authentieke 
                vakantiewoning voor het hele gezin.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sage transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sage transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-sans font-medium text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6">
                Navigatie
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-sans font-medium text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6">
                Contact
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-brand-sage mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                  <span className="font-sans text-xs sm:text-sm text-white/70">
                    Rue du Chardonneret<br />
                    5560 Orchimont, België
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-brand-sage flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                  <span className="font-sans text-xs sm:text-sm text-white/70">
                    +32 (0)XX XXX XX XX
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-brand-sage flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                  <span className="font-sans text-xs sm:text-sm text-white/70">
                    info@maison-chardonneret.be
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-sans font-medium text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6">
                Taal / Langue
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => onLangChange("nl")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-sm transition-colors ${
                    currentLang === "nl"
                      ? "bg-brand-sage text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Nederlands
                </button>
                <button
                  onClick={() => onLangChange("fr")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-sm transition-colors ${
                    currentLang === "fr"
                      ? "bg-brand-sage text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Français
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="font-sans text-[10px] sm:text-xs text-white/50 text-center sm:text-left">
              © {new Date().getFullYear()} Maison Chardonneret Elegant. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="font-sans text-[10px] sm:text-xs text-white/50 hover:text-white/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-sans text-[10px] sm:text-xs text-white/50 hover:text-white/70 transition-colors">
                Algemene Voorwaarden
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};