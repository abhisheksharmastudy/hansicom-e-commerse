import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Shield, AlertTriangle } from "lucide-react"

export default function Preloader() {
  const [isBroken, setIsBroken] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleBreak = () => {
    setIsBroken(true)
    // Play glass break sound here if available
    setTimeout(() => {
      setIsVisible(false)
    }, 800)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden cursor-pointer"
        onClick={handleBreak}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-red-900/10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        {/* The Glass Container */}
        <motion.div
          className="relative z-10 text-center p-12 border-4 border-white/10 bg-white/5 backdrop-blur-md rounded-lg shadow-2xl max-w-lg w-full"
          animate={isBroken ? { scale: 1.1, opacity: 0, rotate: 2 } : { scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-heading font-bold text-white mb-2 tracking-widest uppercase">Target Secure</h1>
          <p className="text-red-400 font-mono text-sm mb-8 tracking-wider">RESTRICTED ACCESS AREA</p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-red-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <button className="relative w-full py-4 bg-neutral-900 border border-red-500/50 text-red-500 font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-3">
              <AlertTriangle className="h-5 w-5" />
              Click to Break Seal
            </button>
          </div>

          {/* Crack Lines (SVG) - Visible only on click/break */}
          {isBroken && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path 
                d="M50 50 L20 10 M50 50 L80 10 M50 50 L10 80 M50 50 L90 90" 
                stroke="rgba(255,255,255,0.8)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1 }}
              />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
