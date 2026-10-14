import { motion } from "framer-motion";
import { Armchair, Leaf, Trees, WifiOff } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useContent } from "@/hooks/useContent";
import { useLang } from "@/contexts/LangContext";
import chardonneretAsset from "@/assets/chardonneret.png.asset.json";

const icons = [Armchair, Leaf, Trees, WifiOff];


const USPCard = ({ icon: Icon, title, description, index }: {
  icon: typeof Armchair;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="px-6 py-6 lg:px-8 lg:py-2"
  >
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-6 h-6 shrink-0 text-[hsl(var(--brand-forest))]" strokeWidth={1.75} aria-hidden="true" />
      <h3 className="font-serif text-[22px] lg:text-[24px] leading-tight text-[hsl(var(--brand-forest))]">{title}</h3>
    </div>
    <p className="font-sans text-base lg:text-[17px] leading-relaxed text-[hsl(var(--brand-charcoal))]">{description}</p>
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

  const usps = [1, 2, 3, 4].map((n, i) => ({
    icon: icons[i],
    title: getT("usps", `usp${n}_title`, fallbackUsps[i].title),
    description: getT("usps", `usp${n}_description`, fallbackUsps[i].description),
  }));

  return (
    <section className="relative bg-background pb-12 md:pb-20">
      <div className="relative w-full h-[300px] sm:h-[420px] md:h-[560px] lg:h-[680px] overflow-hidden">
        <img
          src={chardonneretAsset.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[50%_35%] pointer-events-none"
        />
      </div>
      <Container>
        <div className="relative mt-6 md:-mt-28 lg:-mt-24 rounded-2xl border border-brand-sage/20 bg-[hsl(var(--brand-ivory)/0.97)] shadow-[0_18px_40px_-18px_hsl(var(--brand-dark)/0.35)] backdrop-blur-sm px-2 py-4 md:p-6 lg:px-6 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 divide-brand-sage/20 [&>*]:border-brand-sage/20 md:[&>*:nth-child(even)]:border-l md:[&>*:nth-child(n+3)]:border-t lg:[&>*:nth-child(n+3)]:border-t-0 lg:[&>*:not(:first-child)]:border-l">
            {usps.map((usp, index) => (
              <USPCard key={index} {...usp} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

