import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = '/hero1.jpg',
}: PageHeroProps) {
  return (
    <section className="relative h-[500px] mt-[100px] md:mt-[120px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(58, 90, 64, 0.85) 0%, rgba(45, 70, 50, 0.75) 100%), url('${backgroundImage}')`,
        }}
      />
      <div className="relative h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-6xl text-white font-bold mb-6 font-heading leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white text-xl lg:text-2xl font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
