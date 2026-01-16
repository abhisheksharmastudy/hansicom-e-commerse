import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Products from './pages/Products.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import Contact from './pages/Contact.tsx'
import About from './pages/About.tsx'
import Services from './pages/Services.tsx'
import Cart from './pages/Cart.tsx'

// Auth
import { AuthProvider } from './context/AuthContext.tsx'
import { UserAuthProvider } from './context/UserAuthContext.tsx'

// User Auth Pages
import SignIn from './pages/auth/SignIn.tsx'
import SignUp from './pages/auth/SignUp.tsx'

// Admin imports
import AdminLayout from './components/admin/AdminLayout.tsx'
import AdminLogin from './pages/admin/Login.tsx'
import ProtectedRoute from './components/admin/ProtectedRoute.tsx'
import AdminDashboard from './pages/admin/Dashboard.tsx'
import AdminProducts from './pages/admin/Products.tsx'
import AdminOrders from './pages/admin/Orders.tsx'
import AdminCustomers from './pages/admin/Customers.tsx'
import AdminPlaceholder from './pages/admin/Placeholder.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserAuthProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* User Authentication Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin Login (Public) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="promotions" element={<AdminPlaceholder title="Promotions & Coupons" />} />
              <Route path="content" element={<AdminPlaceholder title="Content Management" />} />
              <Route path="analytics" element={<AdminPlaceholder title="Analytics & Reports" />} />
              <Route path="marketing" element={<AdminPlaceholder title="Marketing & Campaigns" />} />
              <Route path="integrations" element={<AdminPlaceholder title="Integrations & Extensions" />} />
              <Route path="security" element={<AdminPlaceholder title="Security & Audit" />} />
              <Route path="settings" element={<AdminPlaceholder title="Settings & Configuration" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </UserAuthProvider>
  </StrictMode>,
)
