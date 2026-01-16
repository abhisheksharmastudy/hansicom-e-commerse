import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { motion } from "framer-motion"

// StatCard Component
function StatCard({ title, value, change, changeType, icon: Icon }: {
  title: string
  value: string
  change: string
  changeType: "up" | "down"
  icon: React.ElementType
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 border shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          <p className={`text-sm mt-2 flex items-center gap-1 ${changeType === "up" ? "text-green-600" : "text-red-500"}`}>
            {changeType === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {change} vs last month
          </p>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </motion.div>
  )
}

// Mock Recent Orders
const RECENT_ORDERS = [
  { id: "ORD-001", customer: "James Wilson", product: "ABC Extinguisher x2", total: "$90.00", status: "Shipped" },
  { id: "ORD-002", customer: "Sarah Chen", product: "CO2 Extinguisher", total: "$65.00", status: "Processing" },
  { id: "ORD-003", customer: "Mike Ross", product: "Fire Alarm System", total: "$299.00", status: "Pending" },
  { id: "ORD-004", customer: "Emily Clark", product: "Safety Helmet x10", total: "$150.00", status: "Delivered" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$12,450" change="+12.5%" changeType="up" icon={DollarSign} />
        <StatCard title="Orders" value="156" change="+8.2%" changeType="up" icon={ShoppingCart} />
        <StatCard title="Customers" value="1,240" change="+5.1%" changeType="up" icon={Users} />
        <StatCard title="Products" value="48" change="-2.3%" changeType="down" icon={Package} />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-bold text-lg">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-700/50">
              <tr>
                <th className="text-left p-4 font-medium">Order ID</th>
                <th className="text-left p-4 font-medium">Customer</th>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Total</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map(order => (
                <tr key={order.id} className="border-t hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
                  <td className="p-4 font-medium text-primary">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-muted-foreground">{order.product}</td>
                  <td className="p-4 font-medium">{order.total}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                      "bg-neutral-100 text-neutral-600"
                    }`}>
                      {order.status}
                    </span>
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
