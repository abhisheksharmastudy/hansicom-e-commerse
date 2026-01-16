import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { 
  Trash2, Heart, Minus, Plus, ShoppingBag, 
  Truck, ChevronRight, FileText, Lock, Zap, CheckCircle2 
} from "lucide-react"
import { Button } from "../components/ui/Button"

// --- Mock Data ---
interface CartItemType {
  id: number
  name: string
  model: string
  image: string
  price: number
  quantity: number
  stock: number
  gstPercent: number
  hasInstallation: boolean
  installationCost: number
  hasAMC: boolean
  amcCost: number
  isInstallationSelected: boolean
  isAMCSelected: boolean
}

const INITIAL_CART: CartItemType[] = [
  {
    id: 1,
    name: "ABC Dry Powder Fire Extinguisher (6kg)",
    model: "FP-ABC-06",
    image: "https://images.unsplash.com/photo-1582132249535-46d467491d92?auto=format&fit=crop&q=80&w=300",
    price: 4500,
    quantity: 2,
    stock: 15,
    gstPercent: 18,
    hasInstallation: true,
    installationCost: 500,
    hasAMC: true,
    amcCost: 1200,
    isInstallationSelected: false,
    isAMCSelected: false,
  },
  {
    id: 2,
    name: "Smart Smoke Detector Pro",
    model: "SD-PRO-X1",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=300",
    price: 2800,
    quantity: 4,
    stock: 3, // Low stock demo
    gstPercent: 18,
    hasInstallation: true,
    installationCost: 300,
    hasAMC: false,
    amcCost: 0,
    isInstallationSelected: true,
    isAMCSelected: false,
  },
]

// --- Components ---

const CartItem = ({ item, updateItem, removeItem }: { item: CartItemType, updateItem: (id: number, updates: Partial<CartItemType>) => void, removeItem: (id: number) => void }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group relative bg-neutral-900/50 border border-white/5 rounded-xl p-6 mb-4 hover:border-white/10 transition-colors overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />

      <div className="flex gap-6">
        {/* Zoomable Image */}
        <div className="relative h-24 w-24 md:h-32 md:w-32 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0 group/img cursor-zoom-in">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
          {item.stock <= 5 && (
             <div className="absolute bottom-0 left-0 right-0 bg-red-900/90 text-white text-[10px] font-bold text-center py-1 uppercase tracking-wider backdrop-blur-sm">
               Only {item.stock} Left
             </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-neutral-200 group-hover:text-white transition-colors">{item.name}</h3>
              <p className="text-sm text-neutral-500 font-mono">SKU: {item.model}</p>
            </div>
            <p className="text-xl font-bold text-white">₹{item.price.toLocaleString('en-IN')}</p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
            
            <div className="flex flex-col gap-3">
               {/* Installation */}
               {item.hasInstallation && (
                 <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer select-none">
                   <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.isInstallationSelected ? 'bg-red-600 border-red-600' : 'border-neutral-600'}`}>
                     {item.isInstallationSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                   </div>
                   <input type="checkbox" className="hidden" checked={item.isInstallationSelected} onChange={(e) => updateItem(item.id, { isInstallationSelected: e.target.checked })} />
                   <span>Add Installation (+₹{item.installationCost})</span>
                 </label>
               )}
               {/* AMC */}
               {item.hasAMC && (
                 <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer select-none">
                   <div className={`w-8 h-4 rounded-full border relative transition-colors ${item.isAMCSelected ? 'bg-red-600 border-red-600' : 'border-neutral-600 bg-neutral-800'}`}>
                     <div className={`absolute top-0.5 bottom-0.5 w-3 rounded-full bg-white transition-all ${item.isAMCSelected ? 'right-0.5' : 'left-0.5'}`} />
                   </div>
                   <input type="checkbox" className="hidden" checked={item.isAMCSelected} onChange={(e) => updateItem(item.id, { isAMCSelected: e.target.checked })} />
                   <span>Add AMC 1-Year (+₹{item.amcCost})</span>
                 </label>
               )}
            </div>

            <div className="flex items-center gap-6">
                {/* Quantity Stepper */}
                <div className="flex items-center gap-3 bg-neutral-800 rounded-lg p-1 border border-white/10">
                  <button 
                    onClick={() => updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                    className="p-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                  <button 
                     onClick={() => updateItem(item.id, { quantity: Math.min(item.stock, item.quantity + 1) })}
                     className="p-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                   <button className="p-2 text-neutral-500 hover:text-red-500 transition-colors" title="Remove" onClick={() => removeItem(item.id)}>
                     <Trash2 className="h-5 w-5" />
                   </button>
                   <button className="p-2 text-neutral-500 hover:text-blue-400 transition-colors" title="Save for Later">
                     <Heart className="h-5 w-5" />
                   </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}

const CartSummary = ({ cart, subtotal, gst, total, shipping }: { cart: CartItemType[], subtotal: number, gst: number, total: number, shipping: number }) => {
  const [pincode, setPincode] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null)

  const checkPincode = () => {
    if (pincode.length !== 6) return
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setDeliveryDate("Estimated delivery by 18th Oct")
    }, 1500)
  }

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 sticky top-24">
       <h2 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Order Summary</h2>
       
       {/* Pricing Breakdown */}
       <div className="space-y-3 text-sm mb-6 pb-6 border-b border-white/10">
         <div className="flex justify-between text-neutral-400">
           <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
           <span>₹{subtotal.toLocaleString('en-IN')}</span>
         </div>
         <div className="flex justify-between text-neutral-400">
           <span>GST (18%)</span>
           <span>₹{gst.toLocaleString('en-IN')}</span>
         </div>
         <div className="flex justify-between text-neutral-400">
           <span>Shipping</span>
           <span className="text-green-400">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
         </div>
         {shipping === 0 && (
           <div className="text-xs text-green-500 flex items-center gap-1">
             <CheckCircle2 className="h-3 w-3" /> You saved ₹500 on shipping
           </div>
         )}
       </div>

       {/* Total */}
       <div className="flex justify-between items-end mb-8">
         <span className="text-lg font-bold text-white">Total Amount</span>
         <span className="text-3xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
       </div>

       {/* Actions */}
       <div className="space-y-4 mb-8">
          <Button variant="premium" className="w-full py-6 text-lg group">
            Proceed to Checkout
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="w-full py-6 border-neutral-700 hover:bg-white/5 hover:border-neutal-500">
            <FileText className="mr-2 h-4 w-4" /> Request Official Quote
          </Button>
       </div>

       {/* Extras */}
       <div className="space-y-6">
         
         {/* Coupon */}
         <div className="relative">
           <input 
             type="text" 
             placeholder="Enter Coupon Code" 
             className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-red-500 transition-colors uppercase tracking-widest placeholder:normal-case"
           />
           <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-md transition-colors">APPLY</button>
         </div>

         {/* Pincode */}
         <div>
            <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-2 block">Check Delivery Availability</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Pincode" 
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <button 
                onClick={checkPincode}
                disabled={pincode.length !== 6 || isChecking}
                className="bg-neutral-800 text-white px-4 rounded-lg text-sm font-bold hover:bg-neutral-700 disabled:opacity-50 transition-colors"
              >
                {isChecking ? "..." : "Check"}
              </button>
            </div>
            {deliveryDate && <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Truck className="h-3 w-3" /> {deliveryDate}</p>}
         </div>

         {/* Security Badges */}
         <div className="flex items-center justify-center gap-4 text-neutral-600 pt-4 border-t border-white/5">
           <div className="flex items-center gap-1.5" title="Secure SSL">
             <Lock className="h-4 w-4" /> <span className="text-xs font-bold">SSL Secure</span>
           </div>
           <div className="flex items-center gap-1.5" title="Lightning Fast Checkout">
            <Zap className="h-4 w-4" /> <span className="text-xs font-bold">Fast Checkout</span>
           </div>
         </div>
       
       </div>
    </div>
  )
}

export default function Cart() {
  const [cart, setCart] = useState<CartItemType[]>(INITIAL_CART)

  const updateItem = (id: number, updates: Partial<CartItemType>) => {
    setCart(cart.map(item => item.id === id ? { ...item, ...updates } : item))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const calculateTotals = () => {
    let subtotal = 0
    let gst = 0
    let serviceCost = 0

    cart.forEach(item => {
      const itemBase = item.price * item.quantity
      subtotal += itemBase
      
      // Calculate tax on item base
      gst += (itemBase * item.gstPercent) / 100

      // Services (Installation + AMC) - Simplified Tax Logic (Assuming tax included or separate)
      // Let's assume services attract same 18% tax for simplicity in this demo
      if (item.isInstallationSelected) {
        serviceCost += item.installationCost * item.quantity
        gst += (item.installationCost * item.quantity * 0.18)
      }
      if (item.isAMCSelected) {
        serviceCost += item.amcCost * item.quantity
        gst += (item.amcCost * item.quantity * 0.18)
      }
    })

    const shipping = subtotal > 5000 ? 0 : 500
    const total = subtotal + serviceCost + gst + shipping
    
    return { subtotal, gst, total, shipping, serviceCost }
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-6">
           <div>
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">Shopping Cart</h1>
             <p className="text-neutral-400">Review your safety equipment configuration</p>
           </div>
           <div className="hidden md:block text-right">
             <span className="text-sm text-neutral-500 font-bold uppercase tracking-wider block mb-1">Items in Cart</span>
             <span className="text-3xl font-bold text-primary font-mono">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
           </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Left: Items */}
           <div className="lg:col-span-2">
             <AnimatePresence mode="popLayout">
               {cart.length === 0 ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-neutral-900/30 rounded-xl border border-dashed border-neutral-800">
                    <ShoppingBag className="h-16 w-16 text-neutral-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-neutral-400 mb-2">Your cart is empty</h3>
                    <Link to="/products">
                      <Button variant="outline" className="mt-4">Browse Products</Button>
                    </Link>
                 </motion.div>
               ) : (
                 cart.map(item => (
                   <CartItem key={item.id} item={item} updateItem={updateItem} removeItem={removeItem} />
                 ))
               )}
             </AnimatePresence>

             {/* Order Note */}
             <div className="mt-8 pt-8 border-t border-white/10">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 block">Add Order Note (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-sm focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700"
                  placeholder="Special instructions for delivery or installation team..."
                />
             </div>
           </div>

           {/* Right: Summary */}
           <div className="lg:col-span-1">
             <CartSummary cart={cart} {...totals} />
           </div>

        </div>

        {/* Cross-Sell */}
        <div className="mt-24">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Frequently Bought Together</h2>
              <Link to="/products" className="text-red-500 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-neutral-900/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors group">
                   <div className="aspect-square bg-neutral-800 rounded-lg mb-4 relative overflow-hidden">
                     <div className="absolute inset-0 bg-neutral-700/50 animate-pulse" />
                   </div>
                   <h4 className="font-bold text-neutral-300 text-sm mb-1 group-hover:text-white">Safety Signage Set A</h4>
                   <p className="text-red-500 font-bold text-sm">₹450</p>
                   <button className="w-full mt-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors">Add</button>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  )
}
