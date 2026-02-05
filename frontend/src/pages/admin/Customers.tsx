import { useEffect, useState } from "react"
import { Search, Mail, Eye, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { getCustomers, type Customer } from "../../lib/api"

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  function getInitial(name?: string | null, email?: string | null) {
    const value = (name ?? "").trim() || (email ?? "").trim()
    return value ? value.charAt(0).toUpperCase() : "?"
  }

  function formatDate(dateValue?: string | null) {
    if (!dateValue) return "Unknown"
    const parsed = new Date(dateValue)
    return Number.isNaN(parsed.getTime()) ? "Unknown" : parsed.toLocaleDateString()
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    try {
      setLoading(true)
      const data = await getCustomers()
      setCustomers(data)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch customers:", err)
      setError("Failed to load customers. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(customer => {
    if (!normalizedSearchTerm) return true
    const name = (customer.name ?? "").toLowerCase()
    const email = (customer.email ?? "").toLowerCase()
    return name.includes(normalizedSearchTerm) || email.includes(normalizedSearchTerm)
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer profiles and segments.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-neutral-800 w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading customers...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl border border-red-100 dark:border-red-900/30 text-center">
          <p className="mb-4">{error}</p>
          <Button onClick={fetchCustomers} variant="outline" size="sm">Retry</Button>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-xl border border-dashed">
          <p className="text-muted-foreground">No customers found.</p>
        </div>
      ) : (
        /* Customers Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-white dark:bg-neutral-800 rounded-xl border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {getInitial(customer.name, customer.email)}
                  </div>
                  <div>
                    <h3 className="font-bold">{customer.name || "Unnamed Customer"}</h3>
                    <p className="text-xs text-muted-foreground">{customer.email || "No email"}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  customer.provider === "google" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}>
                  {customer.provider === "google" ? "Google User" : "Direct User"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Joined On</p>
                  <p className="font-bold">{formatDate(customer.created_at)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="mr-1 h-3 w-3" /> View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="mr-1 h-3 w-3" /> Email
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
