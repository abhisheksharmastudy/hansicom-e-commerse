import { Search, Mail, Eye } from "lucide-react"
import { Button } from "../../components/ui/Button"

const CUSTOMERS = [
  { id: 1, name: "James Wilson", email: "james@example.com", orders: 12, spent: "$1,240", joined: "2025-06-15", status: "Active" },
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", orders: 8, spent: "$890", joined: "2025-08-22", status: "Active" },
  { id: 3, name: "Mike Ross", email: "mike@example.com", orders: 3, spent: "$450", joined: "2025-11-10", status: "Active" },
  { id: 4, name: "Emily Clark", email: "emily@example.com", orders: 15, spent: "$2,100", joined: "2025-03-05", status: "VIP" },
  { id: 5, name: "David Lee", email: "david@example.com", orders: 1, spent: "$45", joined: "2026-01-10", status: "New" },
]

export default function AdminCustomers() {
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
            className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-neutral-800 w-64"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CUSTOMERS.map(customer => (
          <div key={customer.id} className="bg-white dark:bg-neutral-800 rounded-xl border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{customer.name}</h3>
                  <p className="text-xs text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                customer.status === "VIP" ? "bg-purple-100 text-purple-700" :
                customer.status === "New" ? "bg-blue-100 text-blue-700" :
                "bg-green-100 text-green-700"
              }`}>
                {customer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Orders</p>
                <p className="font-bold">{customer.orders}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Spent</p>
                <p className="font-bold">{customer.spent}</p>
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
    </div>
  )
}
