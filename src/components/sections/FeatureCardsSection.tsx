import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const features = [
  {
    title: "Het Vakantiehuis",
    description: "Authentieke brocante charme met modern comfort",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1474&auto=format&fit=crop",
  },
  {
    title: "De Omgeving",
    description: "Genesteld in de groene heuvels van de Ardennen",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1471&auto=format&fit=crop",
  },
  {
    title: "Activiteiten",
    description: "Wandelen, fietsen, kayakken en meer",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop",
  },
];

const FeatureCard = ({ title, description, image, index }: { 
  title: string; 
  description: string; 
  image: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ y: -10 }}
    className="group relative h-96 rounded-md overflow-hidden cursor-pointer"
  >
    {/* Background Image with Zoom Effect */}
    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    
    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="font-serif text-2xl mb-2 group-hover:text-brand-cream transition-colors">
        {title}
      </h3>
      <p className="font-sans text-sm text-white/80 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {description}
      </p>
    </div>

    {/* Hover Border */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-cream/30 rounded-md transition-colors duration-300" />
  </motion.div>
);

export const FeatureCardsSection = () => {
  return (
    <section id="omgeving" className="py-24 md:py-32 bg-background">
      <Container>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-sans text-sm tracking-[0.2em] uppercase text-brand-sage mb-4"
          >
            Ontdek
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-foreground"
          >
            Alles wat u nodig heeft
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};