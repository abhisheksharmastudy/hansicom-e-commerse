import { motion } from 'framer-motion';

export default function Overlay() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Section 1: Top of scroll */}
      <div className="h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          className="text-center p-6"
        >
           <h1 className="text-5xl md:text-8xl font-heading font-black text-white drop-shadow-2xl mb-4 tracking-tight">
             PROTECT WHAT <br/>
             <span className="text-primary/90">MATTERS MOST</span>
           </h1>
           <p className="text-xl text-neutral-200 font-light max-w-xl mx-auto drop-shadow-md">
             Engineering trust in the face of danger.
           </p>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-[50vh]"></div>

      {/* Section 2: Middle */}
      <div className="h-screen flex items-center justify-start container mx-auto px-4 md:px-12">
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ amount: 0.5 }}
           className="max-w-md bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10"
         >
            <h2 className="text-3xl font-bold text-white mb-4">Precision Engineering</h2>
            <p className="text-neutral-300 leading-relaxed">
              Our extinguishers are crafted to meet ISO 9001 standards, ensuring split-second response times when it counts. 
              Trusted by 500+ industrial partners.
            </p>
         </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-[50vh]"></div>

      {/* Section 3: Bottom */}
      <div className="h-screen flex items-center justify-end container mx-auto px-4 md:px-12">
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ amount: 0.5 }}
           className="max-w-md text-right bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10"
         >
            <h2 className="text-3xl font-bold text-white mb-4">Complete Compliance</h2>
            <p className="text-neutral-300 leading-relaxed">
              From residential high-rises to chemical plants, we provide certified protection that keeps you compliant and safe..
            </p>
         </motion.div>
      </div>
    </div>
  );
}
