import { useState } from "react"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/Button"

const PRODUCTS = [
  { id: 1, name: "ABC Powder Extinguisher 6kg", sku: "EXT-ABC-6", category: "Extinguishers", price: "$45.00", stock: 120, status: "Active" },
  { id: 2, name: "CO2 Extinguisher 2kg", sku: "EXT-CO2-2", category: "Extinguishers", price: "$65.00", stock: 85, status: "Active" },
  { id: 3, name: "Fire Alarm Bell", sku: "ALM-BELL-01", category: "Alarms", price: "$25.00", stock: 200, status: "Active" },
  { id: 4, name: "Smoke Detector Pro", sku: "SNR-PRO-01", category: "Sensors", price: "$35.00", stock: 0, status: "Out of Stock" },
  { id: 5, name: "Fire Hose Reel 30m", sku: "IND-HOSE-30", category: "Industrial", price: "$150.00", stock: 45, status: "Active" },
]

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("")

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
        <select className="border rounded-lg px-4 py-2 bg-white dark:bg-neutral-800">
          <option>All Categories</option>
          <option>Extinguishers</option>
          <option>Alarms</option>
          <option>Sensors</option>
          <option>Industrial</option>
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
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(product => (
                <tr key={product.id} className="border-t hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-muted-foreground font-mono text-xs">{product.sku}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 font-medium">{product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
