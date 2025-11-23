import { motion } from "framer-motion";

export default function CTAStrip() {
  return (
    <section className="bg-secondary py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-heading mb-2">
              Let's Talk About Your Next Shipment
            </h3>
            <p className="text-lg text-text-muted">
              Get in touch for pricing, availability, and delivery options
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-primary transition-all duration-200 hover:bg-primary-dark hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
            >
              Request a Quote
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
