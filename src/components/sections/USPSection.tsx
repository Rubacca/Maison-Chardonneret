import { motion } from "framer-motion";
import { Armchair, Leaf, Trees, WifiOff } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useContent } from "@/hooks/useContent";
import { useLang } from "@/contexts/LangContext";

const icons = [Armchair, Leaf, Trees, WifiOff];

const USPCard = ({ icon: Icon, title, description, index }: {
  icon: typeof Armchair;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center p-4 sm:p-6 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-sage/10 mb-4 sm:mb-6 group-hover:bg-brand-sage/20 transition-colors"
    >
      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-brand-sage" />
    </motion.div>
    <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2 sm:mb-3">{title}</h3>
    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

const fallbackUsps = [
  { title: "Brocante Stijl", description: "Authentiek ingericht met zorgvuldig geselecteerde vintage meubelen" },
  { title: "Energiezuinig", description: "Duurzaam verblijf met moderne isolatie en groene energie" },
  { title: "In de Natuur", description: "Omringd door bossen, weilanden en rustige wandelpaden" },
  { title: "Offline Gaan", description: "Ontkoppel van de drukte en herontdek de eenvoud" },
];

export const USPSection = () => {
  const { lang } = useLang();
  const { getT } = useContent(lang);

  const usps = [
    { icon: icons[0], title: getT("usps", "usp1_title", fallbackUsps[0].title), description: getT("usps", "usp1_description", fallbackUsps[0].description) },
    { icon: icons[1], title: getT("usps", "usp2_title", fallbackUsps[1].title), description: getT("usps", "usp2_description", fallbackUsps[1].description) },
    { icon: icons[2], title: getT("usps", "usp3_title", fallbackUsps[2].title), description: getT("usps", "usp3_description", fallbackUsps[2].description) },
    { icon: icons[3], title: getT("usps", "usp4_title", fallbackUsps[3].title), description: getT("usps", "usp4_description", fallbackUsps[3].description) },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {usps.map((usp, index) => (
            <USPCard key={index} {...usp} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};
