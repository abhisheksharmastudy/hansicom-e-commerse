import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Search, ShoppingCart, Menu, X, ChevronRight, Package, Shield, User, LogOut } from "lucide-react"
import { Button } from "../ui/Button"
import { useUserAuth } from "../../context/UserAuthContext"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const { user, isAuthenticated, logout } = useUserAuth()

  // Smart Hide Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  // Mock Products for Spotlight Search
  const PRODUCTS = [
    { name: "ABC Powder Extinguisher", type: "Extinguisher" },
    { name: "CO2 Extinguisher", type: "Extinguisher" },
    { name: "Smoke Detector Pro", type: "Alarm" },
    { name: "Fire Hydrant Valve", type: "Hydrant" },
  ]
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-tight leading-none text-white">FIREGUARD</span>
              <span className="text-[10px] text-red-500 font-bold tracking-[0.2em] uppercase">Enterprise Safety</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Home", "Products", "Services", "About", "Contact"].map((item) => (
              <Link 
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                className="relative text-sm font-bold text-neutral-300 hover:text-white transition-colors py-2 group"
              >
                 {item}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <Search className="h-5 w-5" />
            </button>
            
            <Link to="/cart" className="relative p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 rounded-full text-[10px] font-bold flex items-center justify-center border border-black text-white">2</span>
            </Link>

            {/* User Auth Section */}
            {isAuthenticated && user ? (
              <div className="hidden md:block relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium hidden lg:block">{user.name.split(' ')[0]}</span>
                </button>
                
                {/* User Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="font-medium text-white text-sm">{user.name}</p>
                        <p className="text-xs text-neutral-400">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 p-3 text-red-400 hover:bg-white/5 text-sm"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/signin" className="hidden md:block">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}

            <div className="hidden md:block">
              <Button variant="premium" size="sm" className="shadow-lg shadow-red-900/20">Get Quote</Button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden relative z-50 text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spotlight Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-start justify-center pt-32 px-4"
          >
            <div className="w-full max-w-2xl relative">
              <button 
                onClick={() => setSearchOpen(false)} 
                className="absolute -top-12 right-0 text-neutral-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                Close <X className="h-4 w-4" />
              </button>
              
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-500" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search products, services..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-neutral-700 text-3xl font-heading font-bold text-white py-4 pl-14 pr-4 focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-700"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Quick Results</p>
                {PRODUCTS.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 cursor-pointer group border border-transparent hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-neutral-800 rounded flex items-center justify-center text-neutral-400 group-hover:text-red-500 transition-colors">
                         {item.type === "Extinguisher" ? <Package className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                       </div>
                       <div>
                         <h4 className="font-bold text-neutral-200 group-hover:text-white">{item.name}</h4>
                         <p className="text-xs text-neutral-500 uppercase tracking-wider">{item.type}</p>
                       </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-red-500 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {["Home", "Products", "Services", "About", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-4xl font-heading font-bold text-neutral-400 hover:text-white hover:pl-4 transition-all block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-neutral-400">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center py-4 text-lg">Sign In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" className="w-full justify-center py-4 text-lg">Create Account</Button>
                    </Link>
                  </>
                )}
                <Button variant="premium" className="w-full justify-center py-6 text-lg">Get a Quote</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
