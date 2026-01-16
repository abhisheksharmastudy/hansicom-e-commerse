import { useState } from "react"
import { Eye, Truck } from "lucide-react"
import { Button } from "../../components/ui/Button"

const ORDERS = [
  { id: "ORD-001", date: "2026-01-14", customer: "James Wilson", email: "james@example.com", total: "$90.00", items: 2, status: "Shipped" },
  { id: "ORD-002", date: "2026-01-14", customer: "Sarah Chen", email: "sarah@example.com", total: "$65.00", items: 1, status: "Processing" },
  { id: "ORD-003", date: "2026-01-13", customer: "Mike Ross", email: "mike@example.com", total: "$299.00", items: 1, status: "Pending" },
  { id: "ORD-004", date: "2026-01-13", customer: "Emily Clark", email: "emily@example.com", total: "$150.00", items: 10, status: "Delivered" },
  { id: "ORD-005", date: "2026-01-12", customer: "David Lee", email: "david@example.com", total: "$45.00", items: 1, status: "Cancelled" },
]

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredOrders = statusFilter === "All" 
    ? ORDERS 
    : ORDERS.filter(o => o.status === statusFilter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Orders</h1>
        <p className="text-muted-foreground">Track and manage customer orders.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status 
                ? "bg-primary text-white" 
                : "bg-white dark:bg-neutral-800 border hover:bg-neutral-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-700/50">
              <tr>
                <th className="text-left p-4 font-medium">Order ID</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Items</th>
                <th className="text-left p-4 font-medium">Total</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-t hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
                  <td className="p-4 font-medium text-primary">{order.id}</td>
                  <td className="p-4 text-muted-foreground">{order.date}</td>
                  <td className="p-4">
                    <div>{order.customer}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4 font-medium">{order.total}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                      order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                      "bg-neutral-100 text-neutral-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost"><Truck className="h-4 w-4" /></Button>
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
