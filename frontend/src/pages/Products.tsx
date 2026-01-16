import { useState, useEffect } from "react"
import { Section } from "../components/ui/Section"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Search, Filter, ShoppingCart, MessageCircle, Loader2 } from "lucide-react"
import { cn } from "../lib/utils"
import { getProducts, type Product } from "../lib/api"

const CATEGORIES = ["All", "Extinguishers", "Alarms", "Hydrants", "Signage"]

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError("Failed to load products. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.product_id.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return 0 // Default order from API
    })

  const handleQuickAddToCart = (e: React.MouseEvent, productName: string) => {
    e.preventDefault()
    e.stopPropagation()
    alert(`${productName} added to cart! (Demo)`)
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-neutral-900 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-heading font-bold mb-4 text-glow">
            Our Products
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">Premium fire safety equipment with ISI, ISO & CE certifications.</p>
        </div>
      </section>

      <Section>
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm focus:border-primary outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  selectedCategory === cat ? "bg-primary text-white" : "bg-neutral-800 text-muted-foreground hover:bg-neutral-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-sm focus:border-primary outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading products...</span>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, i) => {
            const gst = Math.round((product.price * 18) / 100)

            return (
              <motion.div key={product.product_id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/products/${product.product_id}`}>
                  <Card className="group h-full overflow-hidden">
                    {/* Image */}
                    <div className="aspect-square bg-neutral-800 relative overflow-hidden">
                      <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Status Badge */}
                      <span className={cn(
                        "absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded",
                        product.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      )}>
                        {product.status === "active" ? "In Stock" : "Unavailable"}
                      </span>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold bg-black/60 backdrop-blur-sm text-white px-1.5 py-0.5 rounded">{product.type}</span>
                      </div>

                      {/* Quick Add to Cart */}
                      <button
                        onClick={(e) => handleQuickAddToCart(e, product.product_name)}
                        className="absolute bottom-3 right-3 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>

                    <CardContent className="p-5">
                      {/* Category & Model */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-primary uppercase">{product.category}</span>
                        <span className="text-xs font-mono text-muted-foreground">{product.product_id}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.product_name}</h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.short_description}</p>

                      {/* Price */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-muted-foreground ml-1">+ ₹{gst} GST</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>Clear Filters</Button>
          </div>
        )}

        {/* Bulk Quote CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-2xl p-8 text-center border border-white/5">
          <h2 className="text-2xl font-heading font-bold mb-2">Need a Bulk Order?</h2>
          <p className="text-muted-foreground mb-6">Get special pricing for orders of 10+ units.</p>
          <Link to="/contact?bulk=true"><Button variant="premium" size="lg">Request Bulk Quote</Button></Link>
        </div>
      </Section>

      {/* Sticky WhatsApp */}
      <a href="https://wa.me/911234567890?text=Hi, I need help finding the right fire safety product." target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50">
        <Button variant="premium" className="shadow-2xl">
          <MessageCircle className="mr-2 h-5 w-5" /> Ask an Expert
        </Button>
      </a>
    </div>
  )
}
