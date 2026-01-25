import { useEffect, useMemo, useState } from "react"
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { disableProduct, getAdminProducts, type Product } from "../../lib/api"

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState("All")

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getAdminProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Failed to load products. Please ensure you're logged in.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(products.map(product => product.category).filter(Boolean))
    return ["All", ...Array.from(unique)]
  }, [products])

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return products.filter(product => {
      const matchesQuery = !query
        || product.product_name.toLowerCase().includes(query)
        || product.product_id.toLowerCase().includes(query)
      const matchesCategory = filterCategory === "All" || product.category === filterCategory
      return matchesQuery && matchesCategory
    })
  }, [products, searchQuery, filterCategory])

  const handleDisable = async (productId: string) => {
    if (!window.confirm("Disable this product? It will no longer be visible on the storefront.")) {
      return
    }

    try {
      await disableProduct(productId)
      setProducts(prev => prev.map(product => (
        product.product_id === productId ? { ...product, status: "disabled" } : product
      )))
    } catch (err) {
      console.error(err)
      setError("Failed to disable product. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-neutral-800"
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2 bg-white dark:bg-neutral-800"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-700/50">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">SKU</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Capacity</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading products...
                    </span>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-red-500">{error}</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-muted-foreground">
                    No products match your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.product_id} className="border-t hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
                    <td className="p-4 font-medium">{product.product_name}</td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">{product.product_id}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.capacity || "—"}</td>
                    <td className="p-4 font-medium">₹{product.price.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {product.status === "active" ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded" title="Edit product">
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                          title="Disable product"
                          onClick={() => handleDisable(product.product_id)}
                          disabled={product.status !== "active"}
                        >
                          <Trash2 className={`h-4 w-4 ${product.status === "active" ? "text-red-500" : "text-muted-foreground"}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
