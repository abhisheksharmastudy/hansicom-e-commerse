import { Button } from "../components/ui/Button"
import { Section } from "../components/ui/Section"
import { ShieldCheck, Zap, ArrowRight, Phone, MessageCircle, Play, ChevronRight } from "lucide-react"
import { motion, useMotionValue } from "framer-motion"
import { Card, CardContent } from "../components/ui/Card"
import { Link } from "react-router-dom"
import { GlassCard } from "../components/ui/GlassCard"
import { MagneticButton } from "../components/ui/MagneticButton"
import { Spotlight } from "../components/ui/SpotlightEffect"
import { useState } from "react"

// --- TYPES ---
interface Product {
  id: number
  name: string
  category: string
  description: string
  capacity: string
  price: string
  stock: string
  image: string
}

// --- MOCK DATA ---
const SHELF_PRODUCTS: Product[] = [
  { id: 1, name: "ABC Powder Extinguisher", category: "INDUSTRIAL", description: "High-performance multipurpose extinguisher.", capacity: "6kg", price: "₹3,750", stock: "In Stock", image: "EXT" },
  { id: 2, name: "CO2 Fire Extinguisher", category: "COMMERCIAL", description: "Clean agent for electrical fires.", capacity: "2kg", price: "₹5,400", stock: "In Stock", image: "CO2" },
  { id: 3, name: "Fire Alarm System Pro", category: "INDUSTRIAL", description: "Smart detection with IoT integration.", capacity: "-", price: "₹24,900", stock: "Out of Stock", image: "ALM" },
]

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  return (
    <div className="bg-background min-h-screen overflow-x-hidden" onMouseMove={handleMouseMove}>
      
      {/* --- ZONE A: The "Immersive" Hero (Flashlight Reveal) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Flashlight Layer */}
        <Spotlight className="absolute inset-0 z-10" spotlightColor="rgba(255, 87, 34, 0.1)">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615818485202-b430c4974251?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay" />
        </Spotlight>

        {/* Content */}
        <div className="relative z-20 text-center max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter mb-6">
              SAFETY IS NOT AN OPTION. <br />
              <span className="text-primary text-glow">IT IS ENGINEERED.</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-light">
              Advanced fire protection systems engineered for high-risk industrial environments. 
              ISI Certified. IoT Enabled.
            </p>
            
            <div className="flex items-center justify-center gap-6">
              <MagneticButton>
                Secure Your Facility <ArrowRight className="h-5 w-5 ml-2" />
              </MagneticButton>
              <Link to="/products">
                <Button variant="ghost" className="text-white hover:text-primary">
                  Explore Catalog
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Ambient Light Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent z-10 pointer-events-none" />
      </section>

      {/* --- ZONE B: The "Trust Infrastructure" (Bento Grid) --- */}
      <Section className="relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            
            {/* Card 1: Video (Large) */}
            <GlassCard className="md:col-span-2 md:row-span-2 group relative">
              <div className="absolute inset-0 bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop" 
                  alt="Industrial Installation" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Professional Installation</h3>
                <p className="text-neutral-300 max-w-xs">Certified technicians deploying enterprise-grade safety networks.</p>
              </div>
            </GlassCard>

            {/* Card 2: Live Data */}
            <GlassCard hoverEffect className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-between bg-neutral-900/80">
              <div className="flex justify-between items-start">
                <Zap className="h-6 w-6 text-primary" />
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white font-mono-numbers mb-1">150+</div>
                <p className="text-sm text-neutral-400">Patna Facilities Secured</p>
              </div>
            </GlassCard>

            {/* Card 3: 3D Model / Cert */}
            <GlassCard hoverEffect className="md:col-span-1 md:row-span-1 p-6 flex flex-col items-center justify-center text-center bg-neutral-900/80">
              <div className="h-24 w-24 rounded-full border-2 border-primary/30 flex items-center justify-center mb-4 relative group-hover:border-primary transition-colors">
                <ShieldCheck className="h-10 w-10 text-primary" />
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping opacity-20" />
              </div>
              <h4 className="font-bold text-white">ISI Certified</h4>
              <p className="text-xs text-neutral-500 mt-1">Global Safety Standards</p>
            </GlassCard>

            {/* Card 4: Emergency Support (Wide) */}
            <GlassCard hoverEffect className="md:col-span-2 md:row-span-1 flex items-center justify-between p-8 bg-gradient-to-r from-red-900/20 to-neutral-900/50 border-white/5">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <Phone className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Emergency Support?</h3>
                  <p className="text-neutral-400 text-sm">24/7 Rapid Response Team</p>
                </div>
              </div>
              <Button variant="destructive" className="shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                Call Now
              </Button>
            </GlassCard>

          </div>
        </div>
      </Section>

      {/* --- ZONE C: The "E-Commerce Bridge" (Product Shelf) --- */}
      <Section className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Our Catalog</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">Engineering Equipment.</h2>
            </div>
            <Link to="/products">
              <Button variant="outline" className="group">
                View Full Shelf 
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SHELF_PRODUCTS.map((product) => (
              <GlassCard 
                key={product.id}
                className="group relative h-[450px] flex flex-col justify-between hover:bg-white/10 transition-colors duration-500"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image Stage */}
                <div className="relative h-2/3 flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Placeholder for Product Image / X-Ray View */}
                  <motion.div 
                    className="relative z-10 text-8xl font-black text-neutral-800 tracking-tighter"
                    animate={{ scale: hoveredProduct === product.id ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {product.image}
                  </motion.div>

                  {/* Tech Specs Overlay (On Hover) */}
                  <div className={`absolute top-4 left-4 font-mono text-xs text-primary space-y-1 transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : "opacity-0"}`}>
                    <div>CAPACITY: {product.capacity}</div>
                    <div>CLASS: {product.category}</div>
                    <div>STATUS: OK</div>
                  </div>
                </div>

                {/* Info Deck */}
                <div className="p-6 border-t border-white/10 bg-neutral-900/50 backdrop-blur-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="font-mono text-lg font-bold text-primary">{product.price}</div>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{product.description}</p>
                  
                  <Link to={`/products/${product.id}`} className="block">
                    <Button variant="secondary" className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-all">
                      Configure Unit <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Floating Action for Support */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="h-14 w-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="h-7 w-7 text-white" />
        </a>
      </div>
    </div>
  )
}
