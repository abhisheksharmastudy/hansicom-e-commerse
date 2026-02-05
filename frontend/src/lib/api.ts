/**
 * API Configuration and Base Utilities
 * Connects frontend to the Express backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
// Product APIs
// ─────────────────────────────────────────────────────────────

export interface Product {
  product_id: string;
  product_name: string;
  category: string;
  type: string;
  capacity: string;
  short_description: string;
  long_description: string;
  image_url: string;
  price: number;
  status: string;
  created_at: string;
}

interface ProductsResponse {
  success: boolean;
  count: number;
  products: Product[];
}

interface ProductResponse {
  success: boolean;
  product: Product;
}

export async function getProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
  let endpoint = '/products';
  
  if (params) {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.append('category', params.category);
    if (params.search) searchParams.append('search', params.search);
    if (searchParams.toString()) endpoint += `?${searchParams.toString()}`;
  }
  
  const response = await fetchAPI<ProductsResponse>(endpoint);
  return response.products;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetchAPI<ProductResponse>(`/products/${id}`);
    return response.product;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Enquiry APIs
// ─────────────────────────────────────────────────────────────

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  product_interest?: string;
  usage_environment?: string;
  quantity?: number;
  city?: string;
  notes?: string;
  source_page?: string;
}

interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiry_id: string;
}

export async function submitEnquiry(data: EnquiryData): Promise<EnquiryResponse> {
  return fetchAPI<EnquiryResponse>('/enquiry', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// Admin APIs
// ─────────────────────────────────────────────────────────────

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin: { email: string; role: string };
}

export async function adminLogin(email: string, password: string): Promise<LoginResponse> {
  const response = await fetchAPI<LoginResponse>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.token) {
    localStorage.setItem('admin_token', response.token);
  }
  
  return response;
}

export function adminLogout(): void {
  localStorage.removeItem('admin_token');
}

export function isAdminLoggedIn(): boolean {
  return !!localStorage.getItem('admin_token');
}

export interface Enquiry {
  enquiry_id: string;
  timestamp: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  product_interest: string;
  usage_environment: string;
  quantity: number;
  city: string;
  notes: string;
  source_page: string;
}

interface EnquiriesResponse {
  success: boolean;
  count: number;
  enquiries: Enquiry[];
}

export async function getEnquiries(filters?: { startDate?: string; endDate?: string; city?: string }): Promise<Enquiry[]> {
  let endpoint = '/admin/enquiries';
  
  if (filters) {
    const searchParams = new URLSearchParams();
    if (filters.startDate) searchParams.append('startDate', filters.startDate);
    if (filters.endDate) searchParams.append('endDate', filters.endDate);
    if (filters.city) searchParams.append('city', filters.city);
    if (searchParams.toString()) endpoint += `?${searchParams.toString()}`;
  }
  
  const response = await fetchAPI<EnquiriesResponse>(endpoint);
  return response.enquiries;
}

export interface MonthlyReport {
  month: string;
  total_enquiries: number;
  top_product_interest: string;
  top_city: string;
  product_breakdown: Record<string, number>;
  city_breakdown: Record<string, number>;
  daily_trend: Array<{ date: string; count: number }>;
}

interface ReportResponse {
  success: boolean;
  report: MonthlyReport;
}

export async function getMonthlyReport(month?: string): Promise<MonthlyReport> {
  const endpoint = month ? `/admin/reports/monthly?month=${month}` : '/admin/reports/monthly';
  const response = await fetchAPI<ReportResponse>(endpoint);
  return response.report;
}

// Admin product CRUD
export async function createProduct(product: Partial<Product>): Promise<Product> {
  const response = await fetchAPI<{ success: boolean; product: Product }>('/admin/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
  return response.product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const response = await fetchAPI<{ success: boolean; product: Product }>(`/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return response.product;
}

export async function disableProduct(id: string): Promise<void> {
  await fetchAPI(`/admin/products/${id}/disable`, { method: 'PATCH' });
}

// ─────────────────────────────────────────────────────────────
// User Authentication APIs
// ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  provider: 'local' | 'google';
  created_at: string;
}

interface UserAuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

interface UserMeResponse {
  success: boolean;
  user: User;
}

/**
 * Register a new user account
 */
export async function userRegister(name: string, email: string, password: string): Promise<UserAuthResponse> {
  const response = await fetchAPI<UserAuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  
  if (response.token) {
    localStorage.setItem('user_token', response.token);
  }
  
  return response;
}

/**
 * Login user with email and password
 */
export async function userLogin(email: string, password: string): Promise<UserAuthResponse> {
  const response = await fetchAPI<UserAuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.token) {
    localStorage.setItem('user_token', response.token);
  }
  
  return response;
}

/**
 * Google OAuth sign-in
 */
export async function userGoogleAuth(name: string, email: string, googleId: string): Promise<UserAuthResponse> {
  const response = await fetchAPI<UserAuthResponse>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ name, email, googleId }),
  });
  
  if (response.token) {
    localStorage.setItem('user_token', response.token);
  }
  
  return response;
}

/**
 * Get current user from token
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('user_token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      localStorage.removeItem('user_token');
      return null;
    }
    
    const data: UserMeResponse = await response.json();
    return data.user;
  } catch {
    localStorage.removeItem('user_token');
    return null;
  }
}

/**
 * Logout user
 */
export function userLogout(): void {
  localStorage.removeItem('user_token');
}

/**
 * Check if user is logged in
 */
export function isUserLoggedIn(): boolean {
  return !!localStorage.getItem('user_token');
}

/**
 * Get user token
 */
export function getUserToken(): string | null {
  return localStorage.getItem('user_token');
}

// ─────────────────────────────────────────────────────────────
// Admin User Management
// ─────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  name: string;
  email: string;
  created_at: string;
  provider: string;
}

interface CustomersResponse {
  success: boolean;
  users: Customer[];
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetchAPI<CustomersResponse>('/admin/users');
  return response.users;
}
