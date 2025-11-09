import { Shield } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Trust = () => {
  const partners = [
    {
      name: "Microsoft",
      logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=200&h=100&fit=crop",
      category: "Technology Partner",
    },
    {
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=100&fit=crop",
      category: "Cloud Partner",
    },
    {
      name: "Amazon",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=100&fit=crop",
      category: "Enterprise Client",
    },
    {
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop",
      category: "Innovation Partner",
    },
    {
      name: "Netflix",
      logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=100&fit=crop",
      category: "Media Partner",
    },
    {
      name: "Tesla",
      logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=100&fit=crop",
      category: "Automotive Partner",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/10 blur-3xl opacity-70 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10 px-4 sm:px-8 md:px-12">
        <motion.div
          className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Shield size={16} />
          <span>Trusted & Secure</span>
        </motion.div>

        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Trusted by Industry Leaders
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Join thousands of companies and professionals who trust{" "}
          <span className="font-semibold text-primary">TalentBridge Pro</span>{" "}
          for their most important hiring and career decisions.
        </motion.p>
      </div>

      {/* Partner Logos */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-gray-500 tracking-widest">
            TRUSTED BY 2,000+ COMPANIES
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 backdrop-blur-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="relative flex justify-center items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="mt-3 text-center">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {partner.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {partner.category}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl blur-xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
