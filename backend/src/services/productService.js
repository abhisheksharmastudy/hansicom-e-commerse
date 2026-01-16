import { getSheetsClient, getSheetId } from '../config/googleSheets.js';

// ─────────────────────────────────────────────────────────────
// Mock Data (Used when Google Sheets is not configured)
// ─────────────────────────────────────────────────────────────

const MOCK_PRODUCTS = [
  {
    product_id: 'PROD-001',
    product_name: 'ABC Dry Powder Fire Extinguisher (6kg)',
    category: 'Extinguishers',
    type: 'ABC Powder',
    capacity: '6kg',
    short_description: 'Versatile fire extinguisher suitable for Class A, B, and C fires.',
    long_description: 'Premium quality ABC dry powder fire extinguisher with ISI certification. Suitable for offices, homes, vehicles, and industrial settings. Features a durable metal body with anti-corrosion coating.',
    image_url: 'https://images.unsplash.com/photo-1582132249535-46d467491d92?auto=format&fit=crop&q=80&w=600',
    price: 4500,
    status: 'active',
    created_at: '2024-01-15'
  },
  {
    product_id: 'PROD-002',
    product_name: 'CO2 Fire Extinguisher (4.5kg)',
    category: 'Extinguishers',
    type: 'CO2',
    capacity: '4.5kg',
    short_description: 'Ideal for electrical fires and server rooms.',
    long_description: 'Carbon dioxide fire extinguisher designed for electrical equipment and flammable liquid fires. Leaves no residue, making it perfect for data centers and laboratories.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    price: 6800,
    status: 'active',
    created_at: '2024-01-15'
  },
  {
    product_id: 'PROD-003',
    product_name: 'Smart Smoke Detector Pro',
    category: 'Alarms',
    type: 'Photoelectric',
    capacity: 'N/A',
    short_description: 'WiFi-enabled smoke detector with mobile alerts.',
    long_description: 'Advanced photoelectric smoke detector with WiFi connectivity. Sends instant alerts to your smartphone. Features 10-year battery life and easy ceiling mount installation.',
    image_url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=600',
    price: 2800,
    status: 'active',
    created_at: '2024-01-16'
  },
  {
    product_id: 'PROD-004',
    product_name: 'Fire Hydrant Landing Valve',
    category: 'Hydrants',
    type: 'Landing Valve',
    capacity: '63mm',
    short_description: 'ISI marked hydrant valve for building installations.',
    long_description: 'High-quality gunmetal landing valve conforming to IS:5290. Suitable for wet and dry riser systems. Includes coupling and blank cap.',
    image_url: 'https://images.unsplash.com/photo-1545259742-b839d208bb24?auto=format&fit=crop&q=80&w=600',
    price: 3200,
    status: 'active',
    created_at: '2024-01-17'
  },
  {
    product_id: 'PROD-005',
    product_name: 'Fire Safety Signage Pack',
    category: 'Signage',
    type: 'Glow Sign',
    capacity: 'Set of 10',
    short_description: 'Photoluminescent safety signs for emergency exits.',
    long_description: 'Complete set of 10 photoluminescent fire safety signs including exit signs, fire extinguisher location markers, and evacuation route indicators. Complies with NBC 2016 requirements.',
    image_url: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600',
    price: 1200,
    status: 'active',
    created_at: '2024-01-18'
  }
];

// ─────────────────────────────────────────────────────────────
// Service Functions
// ─────────────────────────────────────────────────────────────

/**
 * Get all active products
 */
export async function getAllProducts() {
  const sheets = await getSheetsClient();
  
  // Use mock data if Sheets not configured
  if (!sheets) {
    return MOCK_PRODUCTS.filter(p => p.status === 'active');
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getSheetId(),
      range: 'Products!A2:K', // Skip header row
    });

    const rows = response.data.values || [];
    
    return rows
      .map(row => ({
        product_id: row[0],
        product_name: row[1],
        category: row[2],
        type: row[3],
        capacity: row[4],
        short_description: row[5],
        long_description: row[6],
        image_url: row[7],
        price: parseFloat(row[8]) || 0,
        status: row[9],
        created_at: row[10]
      }))
      .filter(product => product.status === 'active');
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return MOCK_PRODUCTS.filter(p => p.status === 'active');
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId) {
  const sheets = await getSheetsClient();
  
  // Use mock data if Sheets not configured
  if (!sheets) {
    return MOCK_PRODUCTS.find(p => p.product_id === productId) || null;
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getSheetId(),
      range: 'Products!A2:K',
    });

    const rows = response.data.values || [];
    const row = rows.find(r => r[0] === productId);
    
    if (!row) return null;

    return {
      product_id: row[0],
      product_name: row[1],
      category: row[2],
      type: row[3],
      capacity: row[4],
      short_description: row[5],
      long_description: row[6],
      image_url: row[7],
      price: parseFloat(row[8]) || 0,
      status: row[9],
      created_at: row[10]
    };
  } catch (error) {
    console.error('Error fetching product:', error.message);
    return MOCK_PRODUCTS.find(p => p.product_id === productId) || null;
  }
}

/**
 * Create a new product (Admin only)
 */
export async function createProduct(productData) {
  const sheets = await getSheetsClient();
  
  if (!sheets) {
    throw new Error('Google Sheets not configured');
  }

  const newRow = [
    productData.product_id || `PROD-${Date.now()}`,
    productData.product_name,
    productData.category,
    productData.type,
    productData.capacity,
    productData.short_description,
    productData.long_description,
    productData.image_url,
    productData.price,
    'active',
    new Date().toISOString().split('T')[0]
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: getSheetId(),
      range: 'Products!A:K',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [newRow] }
    });

    return { product_id: newRow[0], ...productData, status: 'active' };
  } catch (error) {
    console.error('Error creating product:', error.message);
    throw error;
  }
}

/**
 * Update an existing product (Admin only)
 */
export async function updateProduct(productId, updates) {
  const sheets = await getSheetsClient();
  
  if (!sheets) {
    throw new Error('Google Sheets not configured');
  }

  try {
    // First, find the row number
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getSheetId(),
      range: 'Products!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === productId);
    
    if (rowIndex === -1) {
      throw new Error('Product not found');
    }

    // Get current product data
    const currentProduct = await getProductById(productId);
    const updatedProduct = { ...currentProduct, ...updates };

    const updatedRow = [
      updatedProduct.product_id,
      updatedProduct.product_name,
      updatedProduct.category,
      updatedProduct.type,
      updatedProduct.capacity,
      updatedProduct.short_description,
      updatedProduct.long_description,
      updatedProduct.image_url,
      updatedProduct.price,
      updatedProduct.status,
      updatedProduct.created_at
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: getSheetId(),
      range: `Products!A${rowIndex + 1}:K${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [updatedRow] }
    });

    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw error;
  }
}

/**
 * Disable a product (soft delete)
 */
export async function disableProduct(productId) {
  return updateProduct(productId, { status: 'disabled' });
}
