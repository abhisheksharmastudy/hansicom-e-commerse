import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Check, Shield, Truck, Loader2, Star, Download } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { getProductById, submitEnquiry, type Product } from "../lib/api"
import { useUserAuth } from "../context/UserAuthContext"
import { GlassCard } from "../components/ui/GlassCard"
import { MagneticButton } from "../components/ui/MagneticButton"

const REVIEWS = [
  { author: "Ramesh K.", rating: 5, date: "Jan 10, 2026", content: "Excellent quality! Installation was smooth.", verified: true },
  { author: "Priya S.", rating: 4, date: "Dec 28, 2025", content: "Good product, delivery was on time.", verified: true },
]

// --- COMPONENT ---
export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useUserAuth()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs")
  const [addInstallation, setAddInstallation] = useState(false)
  const [pincode, setPincode] = useState("")
  const [pincodeResult, setPincodeResult] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [cartMessage, setCartMessage] = useState<string | null>(null)
  
  // Scroll animations for split screen
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) // Removed unused 'y' assignment

  // Fetch product
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: location.pathname } })
      return
    }
    
    setAddingToCart(true)
    setTimeout(() => {
      setAddingToCart(false)
      setCartMessage(`Added ${quantity} x ${product.product_name} to cart!`)
      setTimeout(() => setCartMessage(null), 3000)
    }, 500)
  }

  const handleBulkQuote = async () => {
    try {
      if (!product) return
      await submitEnquiry({
        name: "Bulk Quote Request",
        email: "pending@input.com",
        phone: "0000000000",
        product_interest: product.product_name,
        quantity: quantity,
        notes: `Bulk quote request for ${product.product_name}`,
        source_page: `Product Detail - ${product.product_id}`
      })
      setCartMessage("Quote request submitted! Our team will contact you.")
      setTimeout(() => setCartMessage(null), 5000)
    } catch {
      setCartMessage("Failed to submit request. Please try again.")
      setTimeout(() => setCartMessage(null), 3000)
    }
  }

  // Calculate prices
  const gstAmount = Math.round((product.price * 18) / 100)
  const totalPrice = product.price + gstAmount

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeResult("Delivery available in 3-5 business days")
    } else {
      setPincodeResult("Please enter a valid 6-digit pincode")
    }
  }

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary/30">
      
      {/* Sticky Buy Bar (Mobile/Desktop) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4">
            <div className="h-12 w-12 bg-neutral-800 rounded-lg overflow-hidden">
               <img src={product.image_url || "https://placehold.co/100"} alt={product.product_name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{product.product_name}</h4>
              <p className="text-xs text-primary font-mono">₹{totalPrice.toLocaleString()} (Inc. GST)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center border border-white/20 rounded-lg bg-black/50 overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-white hover:bg-white/10">-</button>
              <span className="w-8 text-center text-sm font-mono text-white">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-white hover:bg-white/10">+</button>
            </div>
            <MagneticButton onClick={handleAddToCart} className="flex-1 md:flex-none">
              {addingToCart ? <Loader2 className="animate-spin h-5 w-5" /> : "Add to Cart"}
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pt-32 pb-32" ref={targetRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Sticky Product Image */}
          <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] lg:sticky lg:top-32">
            <GlassCard className="h-full flex items-center justify-center p-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 to-transparent opacity-50" />
               {/* Grid Pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
               
               <img 
                 src={product.image_url || "https://placehold.co/600x600"} 
                 alt={product.product_name} 
                 className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
               />

               {/* Technical Markers */}
               <div className="absolute top-8 right-8 font-mono text-[10px] text-neutral-500 flex flex-col items-end gap-1">
                 <span>FIG. 01 — {product.product_id}</span>
                 <span>SCALE: 1:1</span>
                 <span>MAT: INDUSTRIAL GRADE</span>
               </div>
            </GlassCard>
            
            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
               {[
                 { label: "Warranty", value: "5 Years", icon: Shield },
                 { label: "Delivery", value: "Pan India", icon: Truck },
                 { label: "Certified", value: "ISI Mark", icon: Check },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/5 rounded-lg text-center backdrop-blur-sm">
                   <stat.icon className="h-4 w-4 text-primary mb-1" />
                   <span className="text-[10px] uppercase tracking-wider text-neutral-400">{stat.label}</span>
                   <span className="font-bold text-white text-xs">{stat.value}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT: Scrollable Story */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Header Block */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-primary/20">
                  {product.category || "Safety Equipment"}
                </span>
                <span className="text-green-500 flex items-center gap-1 text-xs font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  IN STOCK
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                {product.product_name}
              </h1>
              <p className="text-neutral-400 text-lg leading-relaxed border-l-2 border-primary/50 pl-4">
                {product.long_description || product.short_description || "High-performance fire safety equipment engineered for reliability in critical situations."}
              </p>
            </div>

            {/* Price Block */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
               <div className="flex items-end gap-2 mb-1">
                 <span className="text-3xl font-mono font-bold text-white">₹{product.price.toLocaleString()}</span>
                 <span className="text-neutral-500 text-sm mb-1">+ ₹{gstAmount} GST</span>
               </div>
               <div className="h-px w-full bg-white/10 my-4" />
               <div className="flex items-start gap-3">
                 <Truck className="h-5 w-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm text-white font-medium">Free Shipping on Bulk Orders</p>
                   <p className="text-xs text-neutral-500">Standard delivery: 3-5 business days.</p>
                 </div>
               </div>

               {/* Pincode Checker */}
               <div className="mt-4 pt-4 border-t border-white/10">
                 <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder="Enter Pincode" 
                     value={pincode}
                     onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                     className="bg-neutral-950 border border-white/20 rounded px-3 py-2 text-sm w-32 focus:border-primary outline-none text-white"
                   />
                   <Button size="sm" variant="secondary" onClick={checkPincode}>Check</Button>
                 </div>
                 {pincodeResult && (
                   <p className={`text-xs mt-2 ${pincodeResult.includes("available") ? "text-green-500" : "text-red-500"}`}>
                     {pincodeResult}
                   </p>
                 )}
               </div>
            </div>

            {/* Blueprint Specs */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-neutral-700" />
                Technical Specifications
              </h3>
              
              <div className="grid grid-cols-1 font-mono text-sm border-t border-white/10">
                {[
                  { k: "Capacity", v: product.capacity || "N/A" },
                  { k: "Type", v: product.type || "Standard" },
                  { k: "Operating Temp", v: "-30°C to +60°C" },
                  { k: "Test Pressure", v: "35 Bar" },
                  { k: "Material", v: "Deep Drawn Steel" },
                ].map((spec, i) => (
                  <div key={i} className="grid grid-cols-2 py-3 border-b border-white/10 hover:bg-white/5 px-2 transition-colors">
                    <span className="text-neutral-400 uppercase">{spec.k}</span>
                    <span className="text-white text-right">{spec.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation Upsell */}
            <div className="relative overflow-hidden rounded-xl border border-primary/30 p-1">
              <div className="absolute inset-0 bg-primary/5 z-0" />
              <div className="relative z-10 bg-neutral-900/90 p-5 rounded-lg flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-white">Need Professional Installation?</h4>
                   <p className="text-xs text-neutral-400 mt-1">Certified engineers available in your area.</p>
                   <label className="flex items-center gap-2 text-sm cursor-pointer select-none mt-2">
                     <input type="checkbox" checked={addInstallation} onChange={() => setAddInstallation(!addInstallation)} className="rounded border-white/20 bg-neutral-900 text-primary focus:ring-primary" />
                     <span className="text-neutral-300">Include Installation (+₹500)</span>
                   </label>
                </div>
              </div>
            </div>

            <Button variant="ghost" className="w-full border border-white/10 hover:bg-white/5" onClick={handleBulkQuote}>
              Request Bulk Quote for Business
            </Button>

          </div>
        </div>

        {/* Tabs: Specs & Reviews */}
        <div className="mb-20 mt-20">
          <div className="flex border-b border-white/10 mb-8">
            <button 
              onClick={() => setActiveTab("specs")}
              className={`px-8 py-4 font-bold border-b-2 transition-colors ${activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-white"}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-4 font-bold border-b-2 transition-colors ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-white"}`}
            >
              Reviews (120)
            </button>
          </div>

          {activeTab === "specs" ? (
             <div className="bg-neutral-900/50 rounded-xl p-8 border border-white/5">
                <h3 className="text-xl font-heading font-bold mb-6">Technical Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                   {[
                     { label: "Product Type", value: product.category },
                     { label: "Material", value: "Industrial Grade Steel" },
                     { label: "Warranty", value: "5 Years Manufacturer Warranty" },
                     { label: "Certification", value: "ISI Mark, ISO 9001:2015" },
                     { label: "Operating Temp", value: "-30°C to +55°C" },
                     { label: "Discharge Range", value: "More than 2 meters" },
                     { label: "Burst Pressure", value: "35 Bar" },
                     { label: "Working Pressure", value: "15 Bar" },
                   ].map((spec, i) => (
                     <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-muted-foreground">{spec.label}</span>
                       <span className="font-medium text-right text-white">{spec.value}</span>
                     </div>
                   ))}
                </div>
                <div className="mt-8 flex gap-4">
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download Datasheet</Button>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Safety Manual</Button>
                </div>
             </div>
          ) : (
             <div className="space-y-6">
                {REVIEWS.map((review, i) => (
                  <div key={i} className="bg-neutral-900/30 p-6 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-white">{review.author}</h4>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                      </div>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-xs text-green-500 mb-2">
                        <Check className="h-3 w-3" /> Verified Purchase
                      </div>
                    )}
                    <p className="text-neutral-300">{review.content}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Load More Reviews</Button>
             </div>
          )}
        </div>

      </div>
      
      {/* Cart Notification */}
      {cartMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold"
        >
          <Check className="h-5 w-5" />
          {cartMessage}
        </motion.div>
      )}
    </div>
  )
}
