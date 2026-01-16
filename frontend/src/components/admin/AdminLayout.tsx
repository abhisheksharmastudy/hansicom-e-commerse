import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  FileText, 
  Settings, 
  BarChart3,
  Shield,
  Mail,
  Puzzle,
  ChevronRight,
  Menu,
  X,
  LogOut
} from "lucide-react"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { useAuth } from "../../context/AuthContext"

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { label: "Customers", icon: Users, path: "/admin/customers" },
  { label: "Promotions", icon: Tag, path: "/admin/promotions" },
  { label: "Content", icon: FileText, path: "/admin/content" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Marketing", icon: Mail, path: "/admin/marketing" },
  { label: "Integrations", icon: Puzzle, path: "/admin/integrations" },
  { label: "Security", icon: Shield, path: "/admin/security" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 text-white transform transition-transform lg:translate-x-0 lg:static lg:inset-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center font-bold text-white">F</div>
            <span className="font-heading font-bold text-lg">FireGuard Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path 
                  ? "bg-primary text-white" 
                  : "text-neutral-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {location.pathname === item.path && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-neutral-800 border-b flex items-center justify-between px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-sm text-muted-foreground">
            Welcome back, <span className="font-bold text-foreground">{admin?.email || 'Admin'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-primary hover:underline">
              View Store →
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
