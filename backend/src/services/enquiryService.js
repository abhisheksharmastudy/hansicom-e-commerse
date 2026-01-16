import { getSheetsClient, getSheetId } from '../config/googleSheets.js';

// ─────────────────────────────────────────────────────────────
// Enquiry Service
// ─────────────────────────────────────────────────────────────

/**
 * Submit a new enquiry
 */
export async function submitEnquiry(enquiryData) {
  const sheets = await getSheetsClient();
  
  const enquiry = {
    enquiry_id: `ENQ-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: enquiryData.name,
    company: enquiryData.company || '',
    email: enquiryData.email,
    phone: enquiryData.phone,
    product_interest: enquiryData.product_interest || '',
    usage_environment: enquiryData.usage_environment || '',
    quantity: enquiryData.quantity || 1,
    city: enquiryData.city || '',
    notes: enquiryData.notes || '',
    source_page: enquiryData.source_page || 'Unknown'
  };

  // If Sheets not configured, just return success (dev mode)
  if (!sheets) {
    console.log('📝 Mock Enquiry Submitted:', enquiry);
    return { success: true, enquiry_id: enquiry.enquiry_id };
  }

  try {
    const newRow = [
      enquiry.enquiry_id,
      enquiry.timestamp,
      enquiry.name,
      enquiry.company,
      enquiry.email,
      enquiry.phone,
      enquiry.product_interest,
      enquiry.usage_environment,
      enquiry.quantity,
      enquiry.city,
      enquiry.notes,
      enquiry.source_page
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: getSheetId(),
      range: 'Enquiries!A:L',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [newRow] }
    });

    return { success: true, enquiry_id: enquiry.enquiry_id };
  } catch (error) {
    console.error('Error submitting enquiry:', error.message);
    throw error;
  }
}

/**
 * Get all enquiries (Admin only)
 */
export async function getAllEnquiries(filters = {}) {
  const sheets = await getSheetsClient();
  
  if (!sheets) {
    return []; // No mock data for enquiries
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getSheetId(),
      range: 'Enquiries!A2:L',
    });

    const rows = response.data.values || [];
    
    let enquiries = rows.map(row => ({
      enquiry_id: row[0],
      timestamp: row[1],
      name: row[2],
      company: row[3],
      email: row[4],
      phone: row[5],
      product_interest: row[6],
      usage_environment: row[7],
      quantity: parseInt(row[8]) || 1,
      city: row[9],
      notes: row[10],
      source_page: row[11]
    }));

    // Apply filters
    if (filters.startDate) {
      enquiries = enquiries.filter(e => new Date(e.timestamp) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      enquiries = enquiries.filter(e => new Date(e.timestamp) <= new Date(filters.endDate));
    }
    if (filters.city) {
      enquiries = enquiries.filter(e => e.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    // Sort by timestamp (newest first)
    enquiries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return enquiries;
  } catch (error) {
    console.error('Error fetching enquiries:', error.message);
    return [];
  }
}
