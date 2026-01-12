import { motion } from "framer-motion";
import { Armchair, Leaf, Trees, WifiOff } from "lucide-react";
import { Container } from "@/components/layout/Container";

const usps = [
  {
    icon: Armchair,
    title: "Brocante Stijl",
    description: "Authentiek ingericht met zorgvuldig geselecteerde vintage meubelen",
  },
  {
    icon: Leaf,
    title: "Energiezuinig",
    description: "Duurzaam verblijf met moderne isolatie en groene energie",
  },
  {
    icon: Trees,
    title: "Genesteld in de Natuur",
    description: "Omringd door bossen, weilanden en rustige wandelpaden",
  },
  {
    icon: WifiOff,
    title: "Echt Offline Gaan",
    description: "Ontkoppel van de drukte en herontdek de eenvoud",
  },
];

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
    className="text-center p-6 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-sage/10 mb-6 group-hover:bg-brand-sage/20 transition-colors"
    >
      <Icon size={28} className="text-brand-sage" />
    </motion.div>
    <h3 className="font-serif text-xl text-foreground mb-3">{title}</h3>
    <p className="font-sans text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export const USPSection = () => {
  return (
    <section className="py-20 bg-muted">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <USPCard key={usp.title} {...usp} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};